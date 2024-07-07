/** @jsx h */
import { h } from 'dom-chef'
import React from 'dom-chef'
import select from 'select-dom'
import {
  getPlayer,
  getPlayerMatches,
  getSelf
} from '../../../helpers/faceit-api'
import { getEloChangesByMatches } from '../../../helpers/elo'
import {
  getPlayerProfileNickname,
  getPlayerProfileStatsGame
} from '../../../helpers/player-profile'
import {
  hasFeatureAttribute,
  setFeatureAttribute
} from '../../../helpers/dom-element'

const FEATURE_ATTRIBUTE = 'matches-elo'

async function updateElo(statsContentElement) {
  const matchElements = select.all('table > tbody > tr', statsContentElement)

  // Remove table head row
  matchElements.shift()

  if (
    matchElements.length === 0 ||
    hasFeatureAttribute(FEATURE_ATTRIBUTE, statsContentElement)
  ) {
    return
  }

  setFeatureAttribute(FEATURE_ATTRIBUTE, statsContentElement)

  const self = await getSelf()
  const nickname = getPlayerProfileNickname()
  const game = getPlayerProfileStatsGame()
  const player = await getPlayer(nickname)

  const matches = await getPlayerMatches(player.id, game, 31)
  const eloChangesByMatches = await getEloChangesByMatches(matches, game)

  if (!eloChangesByMatches) {
    return
  }

  matchElements.forEach((matchElement, i) => {
    const scoreElement = select('td:nth-child(4) span', matchElement)
    const mapElement = select('td:nth-child(5) span', matchElement)

    const match = matches[i]

    if (
      !match ||
      match.i18 !== scoreElement.textContent.trim() ||
      match.i1.indexOf(mapElement.textContent.trim().toLowerCase()) === -1
    ) {
      return
    }

    const eloChange = eloChangesByMatches[match.matchId]

    if (!eloChange) {
      return
    }

    const { eloDiff, newElo } = eloChange

    if (!eloDiff) {
      return
    }

    const resultElement = select('td:nth-child(3) span', matchElement)

    resultElement.textContent += ` (${eloDiff >= 0 ? '+' : ''}${eloDiff})`

    const newEloElement = (
      <div
        style={{
          display: 'flex',
          gap: 4,
          alignItems: 'center'
        }}
      >
        <span
          style={{
            color: '#fff',
            fontWeight: 'normal',
            textTransform: 'none'
          }}
        >
          {newElo}
        </span>
      </div>
    )

    resultElement.append(newEloElement)
  })
}

export default (statsContentElement) => {
  const observer = new MutationObserver(() => {
    if (document.contains(statsContentElement)) {
      updateElo(statsContentElement)
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // Initial call
  updateElo(statsContentElement)
}
