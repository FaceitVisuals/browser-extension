/** @jsx h */
import { h } from 'dom-chef'
import select from 'select-dom'

import {
  hasFeatureAttribute,
  setFeatureAttribute
} from '../../../helpers/dom-element'

import createPlayerBansElement from '../../components/player-bans'
import { getPlayerProfileNickname } from '../../../helpers/player-profile'
import { getPlayer, getPlayerBans } from '../../../helpers/faceit-api'

const FEATURE_ATTRIBUTE = 'profile-bans'

export const PlayerProfileBan = async (parentElement) => {
  // Find the target element #content-grid-element-5
  let targetElement = parentElement
    .querySelector('#parasite-container')
    .querySelector('#content-grid-element-5')

  if (!targetElement) {
    return
  }

  // Check if the feature attribute is already set
  if (hasFeatureAttribute(FEATURE_ATTRIBUTE, targetElement)) {
    return
  }

  // Set the feature attribute to avoid re-processing
  setFeatureAttribute(FEATURE_ATTRIBUTE, targetElement)
  const headerElement = <h3 className="ban-history-header">Ban History</h3>
  targetElement.append(headerElement)

  const nickname = getPlayerProfileNickname()
  const { id } = await getPlayer(nickname)

  const playerBans = await getPlayerBans(id)

  // Create a new div container
  const divContainer = <div className="faceit_visuals"></div>

  if (playerBans.length === 0) {
    // If there are no bans, display a message
    const noBanElement = (
      <div className="no-bans-message">
        <span translate="No match bans yet">No match bans yet</span>
      </div>
    )
    divContainer.append(noBanElement)
  } else {
    // If bans exist, create elements for each ban and append them to the target element
    playerBans.forEach((ban, index) => {
      const playerBansElement = createPlayerBansElement(ban)
      targetElement.append(playerBansElement)

      // Insert a space between each ban element, except for the last one
      if (index < playerBans.length - 1) {
        const spaceElement = document.createElement('br')
        targetElement.append(spaceElement)
      }
    })
  }
}

export default PlayerProfileBan
