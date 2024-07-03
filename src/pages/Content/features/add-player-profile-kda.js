/** @jsx h */
import { h } from 'dom-chef'

import React from 'dom-chef'
import select from 'select-dom'
import {
  getPlayer,
  getPlayerMatches,
  getSelf
} from '../../../helpers/faceit-api'
import { getPlayerStats } from '../../../helpers/faceit-api'
import {
  getPlayerProfileNickname,
  getPlayerProfileStatsGame
} from '../../../helpers/player-profile'
import {
  hasFeatureAttribute,
  setFeatureAttribute
} from '../../../helpers/dom-element'
import { getIsFreeMember } from '../../../helpers/membership'
import { randomNumber } from '../../../shared/utils'

const FEATURE_ATTRIBUTE = 'matches-kda'

export default async (statsContentElement) => {
  const matchElements = select.all('table > tbody > tr', statsContentElement)
  matchElements.shift() // Remove table head row

  if (
    matchElements.length === 0 ||
    hasFeatureAttribute(FEATURE_ATTRIBUTE, statsContentElement)
  ) {
    return
  }

  setFeatureAttribute(FEATURE_ATTRIBUTE, statsContentElement)

  const self = await getSelf()
  const selfIsFreeMember = getIsFreeMember(self)

  const nickname = getPlayerProfileNickname()
  const game = getPlayerProfileStatsGame()
  const player = await getPlayer(nickname)
  const matches = await getPlayerMatches(player.id, game, 31)
  const kda = await getPlayerStats(matches, game)

  if (!kda) {
    return
  }

  matchElements.forEach((matchElement, i) => {
    const kdaStats = kda[matches[i].matchId]

    if (!kdaStats) {
      return
    }

    // Display KDA statistics in the match element
    const kdaElement = document.createElement('div')
    kdaElement.textContent = `KDA: ${kdaStats.kills}/${kdaStats.deaths}/${kdaStats.assists}`
    matchElement.appendChild(kdaElement)
  })
}
