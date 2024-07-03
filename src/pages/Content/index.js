import select from 'select-dom'
import * as pages from '../../helpers/pages'
import * as modals from '../../helpers/modals'
import debounce from 'lodash/debounce'
import { matchRoomIsReady } from '../../helpers/match-room'    
import FeatureHeaderLevelProgress from './features/add-header-level-progress.js'
import PlayerProfileMatchesElo from './features/add-player-profile-matches-elo'
import PlayerProfileBan from './features/player-profile-ban'
import PlayerProfileExtendedStats from './features/player-profile-extended-stats'
import { MatchRoomEloEstmation } from './features/match-room-elo-estimation'

import addPlayerProfileMatchesElo from './features/add-player-profile-matches-elo'

const debouncedPlayerProfileStatsFeatures = debounce(async (parentElement) => {
  await PlayerProfileMatchesElo(parentElement)
  await PlayerProfileExtendedStats(parentElement)
}, 200)

function observeBody() {
  const observer = new MutationObserver((mutationList) => {
    const modalContainer = select('#parasite-modal-container')
    if (modalContainer) {
      const reactModals = modalContainer.querySelectorAll('.ReactModalPortal')

      reactModals.forEach((modal) => {
        if (modal.querySelector('h5')) {
        }
      })
    }

    const modalElement = select('.modal-dialog')
    const fuseModalPortal = select('.FuseModalPortal')

    if (fuseModalPortal) {
    }

    if (modalElement) {
      if (modals.isMatchQueuing(modalElement)) {
      } else if (modals.isPlayerProfile()) {
        // addPlayerProfileBadge(modalElement)
        // addPlayerProfileLinks(modalElement)
        // addPlayerProfileBan(modalElement)

        if (modals.isPlayerProfileStats()) {
          debouncedPlayerProfileStatsFeatures(modalElement)
        }
      }
    }

    FeatureHeaderLevelProgress()

    const mainContentElement = select('#main-content')

    if (mainContentElement) {
      if (pages.isRoomOverview() || matchRoomIsReady()) {
        MatchRoomEloEstmation(mainContentElement)
      } else if (pages.isPlayerProfile()) {
        // addPlayerProfileBadge(mainContentElement)
        PlayerProfileBan(mainContentElement)

        addPlayerProfileMatchesElo(mainContentElement)
        // addPlayerProfileLinks(mainContentElement)

        if (pages.isPlayerProfileStats()) {
          debouncedPlayerProfileStatsFeatures(mainContentElement)
          PlayerProfileBan(mainContentElement)
          addPlayerProfileMatchesElo(mainContentElement)
        }
      } else if (pages.isTeamsOverview()) {
        console.log('TeamsOverview')
      }
      if (pages.isHub()) {
        addHubTable(mainContentElement)
      }
    }

    for (const mutation of mutationList) {
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.shadowRoot) {
          observer.observe(addedNode.shadowRoot, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['aria-hidden']
          })
        }
      }
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['aria-hidden']
  })
}
 

;(async () => {
  observeBody()
})()
