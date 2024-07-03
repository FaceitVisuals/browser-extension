// Get steamID
const steamid = getSteamID();
loadFaceITProfile(steamid);

// Create global variables
let id, 
level, 
levelImg,
username, 
country, 
banned,
banStartTime,
banEndTime,
banReason,
membership = '', 
elo = '', 
avgHS = '-',
avgKD = '-', 
matches = '-', 
winrate = '-',
registred = '';