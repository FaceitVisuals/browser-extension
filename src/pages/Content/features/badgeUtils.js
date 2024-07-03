import React from 'react';
import axios from 'axios';
import { getRoomId } from '../../helpers/match-room';
import { getMatch } from '../../helpers/faceit-api';




export function assignBadges(container, badgesResponse, item) {
    const profile = container.children[0]

    const userBadges = badgesResponse.data.exists;
    const userId = item.dataset.userId;
    const userHasBadges = userBadges.some((badge) => badge.username === userId);
    if (userHasBadges) {
    container.innerHTML = ''
    const badgesContainer = document.createElement('div')
    badgesContainer.style.display = 'flex'
    badgesContainer.style.alignItems = 'center'
    badgesContainer.style.cursor = 'help'
    badgesContainer.style.gap = '2px'
    badgesContainer.style.width = '32px'
    badgesContainer.style.height = '32px'
   badgesContainer.style.aspectRatio='max-height: 100%; max-width: 100%'
    badgesContainer.innerHTML = createBadge(
      badgesResponse.data.exists,
      item.dataset.userId
    )
    container.appendChild(profile)
    container.appendChild(badgesContainer)
  }
  }
  export function createBadge(badges, userId) {
    let user = null
    for (let i = 0; i < badges.length; i++) {
      if (badges[i].username == userId) {
        user = badges[i]
        break
      }
    }

    let badge = ``
    if (user) {
      switch (String(user.badge).toLowerCase()) {
        case 'vip':
          badge = `<img src='${chrome.runtime.getURL(
            'vip.png'
          )}' style='max-height: 100%; max-width: 100% ;' title='${user.badge}' />`
          break
        case 'admin':
          badge = `<img src='${chrome.runtime.getURL(
            'admin.png'
          )}' style='max-height: 100%; max-width: 100% cursor = 'help';' title='FACEIT  Live Admin' />`
          break
        case 'faceit':
          badge = `<img src='${chrome.runtime.getURL(
            'faceit.png'
          )}' style='width: 32px; height: 32px;' title='Working at Faceit' />`
          break
          case 'jun':
          badge = `<img src='${chrome.runtime.getURL(
            'jun.png'
          )}' style='width: 32px; height: 32px;' title='Vip' />`
          break
        case 'sm':
          badge = `<img src='${chrome.runtime.getURL(
            'pro.png'
          )}' style='width: 32px; height: 32px;' title='Pro at National level' />`
          break
          case 'creator':
          badge = `<img src='${chrome.runtime.getURL(
            'shadii.png'
          )}' style='max-height: 100%; max-width: 100%' title='CREATOR' />`
          break
        
        case 'pro':
          badge = `<img src='${chrome.runtime.getURL(
            'pro.png'
          )}' style='width: 32px; height: 32px;' title='Professional Player' />`
          break
        case 'legend':
          badge = `<img src='${chrome.runtime.getURL(
            'legend.png'
          )}' style='width: 32px; height: 32px;' title='LEGEND of CounterStrike' />`
          break
        case 'insider':
          badge = `<img src='${chrome.runtime.getURL(
            'insider.png'
          )}' style='width: 32px; height: 32px;' title='Part of the exclusive FACEIT Insider Group' />`
          break
        case 'streamery':
          badge = `<img src='${chrome.runtime.getURL(
            'youtuber.png'
          )}' style='width: 32px; height: 32px;' title='STREAMER' />`
          break
        case 'streamert':
          badge = `<img src='${chrome.runtime.getURL(
            'twitch.png'
          )}' style='width: 32px; height: 32px;' title='STREAMER' />`
          break
        
        case 'ropl admin':
          badge = `<img src='${chrome.runtime.getURL(
            'ropl1.png'
          )}' style='width: 32px; height: 32px;' title='${user.badge}' />`
      }
    }

    return badge
  }
  export async function getAPIUserIds() {
    const _userIds = []
    const roomId = getRoomId()

    if (roomId) {
      const match = await getMatch(roomId)

      if (match) {
        for (const team in match.teams) {
          for (const user in match.teams[team].roster) {
            const { id, nickname } = match.teams[team].roster[user]
            _userIds.push({ id, nickname })
          }
        }
      }
    }

    return _userIds
  }
