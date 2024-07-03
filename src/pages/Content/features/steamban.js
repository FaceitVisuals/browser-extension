(() => {
    let visitedTabs = new Set();

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === "loading" && tab.url && !visitedTabs.has(tabId)) {
            visitedTabs.add(tabId);
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["faceit.js", "backoffice.js"]
            }, () => visitedTabs.delete(tabId));
        }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "GetMorePlayer") {
            return async function (data) {
                try {
                    const nicknameResponse = await fetch(`https://api.faceit.com/users/v1/nicknames/${data.nickname}`);
                    const nicknameData = await nicknameResponse.json();
                    Object.assign(data.player, nicknameData);

                    const matchResponse = await fetch(`https://api.faceit.com/match/v1/matches/groupByState?userId=${data.player.id}`);
                    const matchData = await matchResponse.json();

                    if (matchData.payload && Object.keys(matchData.payload).length > 0) {
                        const key = Object.keys(matchData.payload)[0];
                        const gameLobbies = matchData.payload[key].map(item => ({ id: item.id, game: item.game }));
                        data.player.gameLobbies = gameLobbies;
                    } else {
                        data.player.gameLobbies = [];
                    }

                    return { action: "GetMorePlayer", data: data.player, success: true };
                } catch (error) {
                    console.error("[Faceit alternative addon] Error fetching player data:", error);
                    return { action: "GetMorePlayer", success: false, error: "Failed to get Faceit data" };
                }
            }(message).then(result => sendResponse(result)).catch(error => {
                console.error("[Faceit alternative addon] Error:", error);
                sendResponse({ action: "GetMorePlayer", success: false, error: error.message });
            });
        }
        return true;
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "getFaceitMatch") {
            return async function (identifier) {
                try {
                    const matchUrl = `https://api.faceit.com/match/v2/match/${identifier}`;
                    const historyUrl = `https://api.faceit.com/democracy/v1/match/${identifier}/history`;
                    const [matchResponse, historyResponse] = await Promise.all([
                        fetch(matchUrl),
                        fetch(historyUrl).catch(() => null)
                    ]);

                    if (!matchResponse.ok) throw new Error("Failed to fetch Faceit match data");

                    const matchData = await matchResponse.json();
                    const vetoData = historyResponse ? await historyResponse.json() : null;

                    if (vetoData) matchData.vetoData = vetoData;

                    return matchData;
                } catch (error) {
                    console.log("[Faceit alternative addon] Failed to retrieve Faceit match data:", error);
                    return { success: false };
                }
            }(message.identifier).then(result => {
                sendResponse({ success: true, matchData: result });
            }).catch(error => {
                console.log("[Faceit alternative addon] Failed to retrieve Faceit match data:", error);
                sendResponse({ success: false });
            });
        }
        return true;
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "getFaceitData") {
            return function (steamId, callback) {
                fetch(`https://api.faceit.com/search/v1/?limit=20&query=${steamId}`)
                    .then(response => response.json())
                    .then(data => {
                        const players = data.payload.players.results;
                        let playerDataArray = [];

                        for (let i = 0; i < players.length; i++) {
                            const player = players[i];
                            if (player.status === "deactivated") {
                                playerDataArray.push({
                                    player: { ...player },
                                    nicknameData: null,
                                    deactivated: true
                                });
                            } else {
                                playerDataArray.push({
                                    player: { ...player },
                                    nicknameData: null,
                                    deactivated: false
                                });
                            }
                        }

                        if (playerDataArray.length === 0) {
                            return void callback("No account found");
                        }

                        const promiseArray = playerDataArray
                            .filter(playerData => !playerData.deactivated)
                            .map(playerData => {
                                const nickname = playerData.player.nickname;
                                return fetch(`https://api.faceit.com/users/v1/nicknames/${nickname}`)
                                    .then(response => response.json())
                                    .then(data => ({ player: { ...playerData.player, ...data.payload }, nicknameData: data, deactivated: false }))
                                    .catch(error => {
                                        console.log(`[Faceit alternative addon] Error getting data for ${nickname}:`, error);
                                        return null;
                                    });
                            });

                        Promise.all(promiseArray).then(resultArray => {
                            const validResults = resultArray.filter(result => result !== null);
                            const finalResultArray = playerDataArray.map(playerData => {
                                return validResults.find(item => item.player.guid === playerData.player.guid) || playerData;
                            });
                            callback(finalResultArray);
                        }).catch(error => {
                            console.log("[Faceit alternative addon] Error getting nickname data:", error);
                            callback(null);
                        });
                    })
                    .catch(error => {
                        console.log("[Faceit alternative addon] Error:", error);
                        callback(null);
                    });
            }(message.steamId, function (result) {
                if (!result) {
                    sendResponse({ success: false, error: "Failed to get Faceit data" });
                } else {
                    const promiseArray = result.map(item => new Promise((resolve, reject) => {
                        (function (data, resolve) {
                            const playerId = data.player.id;

                            fetch(`https://api.faceit.com/sheriff/v1/bans/${playerId}`)
                                .then(response => response.json())
                                .then(sheriffData => {
                                    data.sheriff = sheriffData;

                                    fetch(`https://api.faceit.com/queue/v1/ban?userId=${playerId}&organizerId=faceit&offset=0&limit=3`)
                                        .then(response => response.json())
                                        .then(queueData => {
                                            data.bans = queueData;
                                            resolve(data);
                                        })
                                        .catch(error => {
                                            console.log("[Faceit alternative addon] Error getting queue bans data:", error);
                                            data.bans
                                     