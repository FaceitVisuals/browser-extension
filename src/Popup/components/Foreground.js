import 'regenerator-runtime/runtime';
import React from 'react';
import axios from 'axios';
import { getRoomId } from '../../helpers/match-room';
import { getMatch } from '../../helpers/faceit-api';

function Foreground() {
  let queries = []

  window.addEventListener('load', async () => {
    new MutationObserver(async (mutations) => {
      for (const mutation of mutations) {
        if (!(mutation.target instanceof HTMLElement)) continue
        const parasiteContainer = mutation.target.querySelector(
          '#MATCHROOM-OVERVIEW > div:nth-child(3)'
        )

        if (parasiteContainer && parasiteContainer) {
          const roster1 = parasiteContainer.querySelector('[name="roster1"]')
          const roster2 = parasiteContainer.querySelector('[name="roster2"]')
          if (roster1 && roster2) {
            3
            if ([...roster1.children].length === 1) {
              if (roster1.firstElementChild.children.length === 1) {
                if (roster1.firstElementChild.firstElementChild.length === 1) {
                  queries = [
                    ...roster1.firstElementChild.firstElementChild
                      .firstElementChild.children,
                    ...roster2.firstElementChild.firstElementChild
                      .firstElementChild.children
                  ]
                } else {
                  queries = [
                    ...roster1.firstElementChild.firstElementChild.children,
                    ...roster2.firstElementChild.firstElementChild.children
                  ]
                }
              } else {
                queries = [
                  ...roster1.firstElementChild.children,
                  ...roster2.firstElementChild.children
                ]
              }
            } else {
              queries = [...roster1.children, ...roster2.children]
            }

            const userIds = await getAPIUserIds()
            const badgesResponse = await axios({
              method: 'post',
              url: process.env.SERVER_URL,
              data: { users: userIds?.map((item) => item?.id) }
            })

            queries.forEach((query) => {
              if (query.children.length > 1) {
                ;[...query.children].map((child) => {
                  const nickname = child.innerText.split(/\r?\n/)[0]
                  child.dataset.nickname = nickname
                  child.dataset.userId = userIds?.find(
                    (user) => user.nickname == nickname
                  )?.id

                  const container =
                    child.querySelector('img')?.parentElement?.parentElement
                      ?.parentElement
                  if (container) {
                    assignBadges(container, badgesResponse, child)
                  }
                })
              } else {
                const nickname = query.innerText.split(/\r?\n/)[0]
                query.dataset.nickname = nickname
                query.dataset.userId = userIds?.find(
                  (user) => user.nickname == nickname
                )?.id

                const container =
                  query.querySelector('img')?.parentElement?.parentElement
                    ?.parentElement
                if (container) {
                  assignBadges(container, badgesResponse, query)
                }
              }
            })

            break
          }
        }
      }
    }).observe(document.body, {
      childList: true,
      subtree: true
    })
  })

  function assignBadges(container, badgesResponse, item) {
    const profile = container.children[0]

    const userBadges = badgesResponse.data.exists
    const userId = item.dataset.userId
    const userHasBadges = userBadges.some((badge) => badge.username === userId)
    if (userHasBadges) {
      container.innerHTML = ''
      const badgesContainer = document.createElement('div')
      badgesContainer.style.display = 'flex'
      badgesContainer.style.alignItems = 'center'
      badgesContainer.style.cursor = 'help'
      badgesContainer.style.gap = '2px'
      badgesContainer.style.width = '32px'
      badgesContainer.style.height = '32px'
      badgesContainer.style.aspectRatio = 'max-height: 100%; max-width: 100%'
      badgesContainer.innerHTML = createBadge(
        badgesResponse.data.exists,
        item.dataset.userId
      )
      container.appendChild(profile)
      container.appendChild(badgesContainer)
    }
  }
  function createBadge(badges, userId) {
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
          )}' style='max-height: 100%; max-width: 100% ;' title='${
            user.badge
          }' />`
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
        case 'gold':
          badge = `<img src='${chrome.runtime.getURL(
            'gold.png'
          )}' style='width: 32px; height: 32px;' title='V.I.P.' />`
          break

        case 'sm':
          badge = `<img src='${chrome.runtime.getURL(
            'pro.png'
          )}' style='width: 32px; height: 32px;' title='' />`
          break
        case 'creator':
          badge = `<img src='${chrome.runtime.getURL(
            'shadii.png'
          )}' style='max-height: 100%; max-width: 100%' title='Developer' />`
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
      }
    }

    return badge
  }

  async function getAPIUserIds() {
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

  return <></>
}

export default Foreground