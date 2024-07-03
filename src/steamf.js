

const steamid = getSteamID()
loadFaceITProfile(steamid)

let id, 
level, 
levelImg,
username, 
country, 
banned, 
banReason,
membership = '', 
elo = '', 
avgHS = '-',
avgKD = '-', 
matches = '-', 
winrate = '-',
registred = '';

function loadFaceITProfile(steamid) {
  if (steamid === null) {
    return
  }

  chrome.runtime.sendMessage(
    'https://api.faceit.com/search/v1/?limit=3&query=' + steamid,
    (result) => onFaceITProfileLoaded(result)
  )
}

async function onFaceITProfileLoaded(result) {
  const profile = await getMainProfile(result)

  if (profile !== null) {
    id = profile.guid
    username = profile.nickname
    country = profile.country
    level = getLevel(profile.games, 'cs2')
    levelImg = chrome.runtime.getURL(`../img/levels/${level}.png`)

    updateDOM()

    chrome.runtime.sendMessage(
      'https://api.faceit.com/sheriff/v1/bans/' + id,
      (result) => {
        if (result[0]) {
          banned = true
          banReason = result[0].reason
          updateDOM()
        }
      }
    )

    chrome.runtime.sendMessage(
      'https://api.faceit.com/users/v1/nicknames/' + username,
      (result) => {
        membership =
          result.memberships.includes('cs2') ||
          result.memberships.includes('premium')
            ? 'Premium'
            : 'Free'
        elo = result.games.cs2.faceit_elo
        registred = new Date(result.created_at).toLocaleString('en-us', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
        updateDOM()
      }
    )

    chrome.runtime.sendMessage(
      'https://api.faceit.com/stats/v1/stats/users/' + id + '/games/cs2',
      (result) => {
        avgHS = result.lifetime.k8
        avgKD = result.lifetime.k5
        matches = result.lifetime.m1
        winrate = result.lifetime.k6
        updateDOM()
      }
    )
  }
}

function updateDOM() {
  //Select the element where to show faceit profile data
  const customize =
    document.querySelector('.profile_customization_area') ??
    document.querySelector('.profile_leftcol')

  //Add the box with the data
  let textNode = document.createElement('div')
  textNode.id = 'faceit_visuals'
  textNode.innerHTML =
    `
    <div class="profile_customization">
        <div class="profile_customization_header">FACEIT Visuals by shadi</div>
        <div class="profile_customization_block">
            <div class="favoritegroup_showcase">
                <div class="showcase_content_bg">
                    <div class="faceit_visuals_content favoritegroup_showcase_group showcase_slot" style="padding-left: 0px ;
                    height:55px ; width: fit-content;
                    block-size: fit-content;>                  
                        <div class="favoritegroup_content">
                            <div class="faceit_visuals_namerow favoritegroup_namerow ellipsis" style="min-width:220px;float:left;margin-top: 10px;overflow:auto">
                                <a class="favoritegroup_name whiteLink" target="_blank" href="https://www.faceit.com/en/players/` +
    username +
    `">
                                    <img class="faceit_visuals_country" title="${country}" src="https://cdn-frontend.faceit.com/web/112-1536332382/src/app/assets/images-compress/flags/${country}.png">
                                    ` +
    username +
    ` 
                                </a>
    
                                <span class="faceit_visuals_description favoritegroup_description">
                                ` +
    (banned
      ? `<span  style="color:red" alt="${banReason}" class="faceit-banned">   BANNED:${banReason}</span> `
      : `<strong>${membership} - ${registred}</strong>`) +
    `
                                <div class="value"> LEVEL >${level} |
                                         
                                         ELO>
                                         ${elo} | GUID <strong style="color: white;"> ${id}</strong>
                                         </div> </span>
                            </div>
                            <div class="faceit_visuals_stats_block">
                                <div class="faceit_visuals_stats_row2 favoritegroup_stats showcase_stats_row">
                                    <div class="faceit_visuals_stat showcase_stat favoritegroup_online  ">
                                        <div class="value">${level}</div>
                                        <div class="label">LEVEL</div>
                                    </div>
                                   
                                    
                                    <
                                   
                                    
                                    <div style="clear: left;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

  if (document.getElementById('faceit_visuals')) {
    document.getElementById('faceit_visuals').innerHTML = textNode.innerHTML
  } else {
    customize.prepend(textNode)
  }
}

function getLevel(games, searchGame) {
  let level = 1
  games.map((game) => {
    if (game.name === searchGame) {
      level = game.skill_level
    }
  })

  return level
}

async function getMainProfile(result) {
  let profile = null
  const allPlayers = result.players.results
  if (allPlayers.length > 1) {
    allPlayers.map(async (user, index) => {
      if (user.games.length > 0) {
        user.games.map(async (game) => {
          if (game.name == 'cs2') {
            profile = allPlayers[index]
          }
        })
      }
    })
  } else {
    profile = allPlayers[0]
  }

  return profile
}

function getSteamID() {
  if (
    document.getElementsByName('abuseID') &&
    document.getElementsByName('abuseID')[0]
  ) {
    return document.getElementsByName('abuseID')[0].value
  } else {
    return (
      document
        .querySelector('.responsive_page_template_content')
        .innerHTML.split('script')[2]
        .split('"')[8] ?? null
    )
  }
}
