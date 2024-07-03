/** @jsx h */
import { h } from 'dom-chef'
import select from 'select-dom'
import { getHub } from '../../../helpers/faceit-api'
import {
  getHubId,
  getPlayerIdsFromMatchRoom
} from '../../../helpers/match-room'
import { getPlayer } from '../../../helpers/faceit-api'
import {
  hasFeatureAttribute,
  setFeatureAttribute
} from '../../../helpers/dom-element'
import createEloElement from '../../components/elo'

const FEATURE_ATTRIBUTE = 'table-elo'

export default async () => {
  const clubContentElement = select(
    '#content-grid-element-1 > div.sc-bzyemU.dHXJnz > div > div.sc-gnSBPq.cQMwbd > table > tbody > tr:nth-child(1)'
  )

  if (
    !clubContentElement ||
    hasFeatureAttribute(FEATURE_ATTRIBUTE, clubContentElement)
  ) {
    return
  }
  setFeatureAttribute(FEATURE_ATTRIBUTE, clubContentElement)

  const hubId = getHubId()
  const playerIds = getPlayer(hubId)

  if (!playerIds) {
    return
  }

  for (const playerId of playerIds) {
    const player = await getPlayer(playerId)

    if (!player) {
      continue
    }

    const { country, cs2Name, games, cs2SkillLevel } = player
    const elo = games?.cs2?.faceitElo || '–'
    const userIds = await getAPIUserIds()
    const playerRow = select(
      `tr[data-player-id="${playerId}"]`,
      clubContentElement
    )

    if (!playerRow) {
      continue
    }

    const detailsElement = select('.details', playerRow)
    const nicknameElement = select('.nickname', playerRow)

    if (badges[player.id]) {
      const featuredPlayerBadgeElement = createFeaturedPlayerBadgeElement(
        badges[player.id]
      )
      detailsElement.insertAdjacentElement(
        'afterbegin',
        <div style={{ 'margin-bottom': 2 }}>{featuredPlayerBadgeElement}</div>
      )
    }

    if (cs2Name) {
      detailsElement.appendChild(
        <span className="text-muted" style={{ display: 'block' }}>
          {cs2Name}
        </span>
      )
    }

    playerRow.children[0].appendChild(
      <div style={{ display: 'flex', flexShrink: 0 }}>
        {createEloElement({
          elo,
          className: 'text-muted text-md',
          alignRight: true,
          style: { 'margin-right': 4 }
        })}
        {createSkillLevelElement({ level: cs2SkillLevel || 0 })}
      </div>
    )

    const flagElement = createFlagElement({ country })
    nicknameElement.prepend(flagElement)
  }

  async function getAPIUserIds() {
    const _userIds = []
    const roomId = getHubId()

    if (roomId) {
      const match = await getHub(roomId)

      if (match) {
        _userIds.push({ id, nickname })
      }
    }
  }
  return _userIds
}
