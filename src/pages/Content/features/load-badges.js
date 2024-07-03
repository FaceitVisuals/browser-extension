import 'regenerator-runtime/runtime';
import React from 'react';
import axios from 'axios';


import { assignBadges, createBadge, getAPIUserIds } from './badgeUtils';

export function observeMutations() {

    window.addEventListener('load', async () => {

    
        new MutationObserver(async (mutations) => {
          for (const mutation of mutations) {
            if (!(mutation.target instanceof HTMLElement)) continue
            const parasiteContainer = mutation.target.querySelector(
              '#MATCHROOM-OVERVIEW > div:nth-child(3)'
            )
            
            if (parasiteContainer && parasiteContainer) {
              const roster1 =
                parasiteContainer.querySelector('[name="roster1"]')
              const roster2 =
                parasiteContainer.querySelector('[name="roster2"]')
              if (roster1 && roster2) {
                if ([...roster1.children].length === 1) {
                  if (roster1.firstElementChild.children.length === 1) {
                    if (roster1.firstElementChild.firstElementChild.length === 1) {
                      queries = [
                        ...roster1.firstElementChild.firstElementChild
                          .firstElementChild.children,
                        ...roster2.firstElementChild.firstElementChild
                          .firstElementChild.children,
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
                  url: `https://shadiflo-server.onrender.com/`,
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
    }
