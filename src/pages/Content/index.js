import select from 'select-dom'
import * as pages from '../../helpers/pages'
import debounce from 'lodash/debounce'
import { matchRoomIsReady } from '../../helpers/match-room'
import FeatureHeaderLevelProgress from './features/add-header-level-progress.js'
import PlayerProfileMatchesElo from './features/add-player-profile-matches-elo'
import PlayerProfileBan from './features/player-profile-ban'
import { MatchRoomEloEstmation } from './features/match-room-elo-estimation'

const debouncedPlayerProfileStatsFeatures = debounce(async (parentElement) => {
  await PlayerProfileMatchesElo(parentElement)
}, 200)

function observeBody() {
  const observer = new MutationObserver(() => {
    FeatureHeaderLevelProgress()

    const mainContentElement = select('#main-content')

    if (mainContentElement) {
      if (pages.isRoomOverview() || matchRoomIsReady()) {
        MatchRoomEloEstmation(mainContentElement)
      } else if (pages.isPlayerProfile()) {
        PlayerProfileBan(mainContentElement)

        if (pages.isPlayerProfileStats()) {
          debouncedPlayerProfileStatsFeatures(mainContentElement)
        }
      } else if (pages.isTeamsOverview()) {
        console.log('TeamsOverview')
      }
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

;(async () => {
  observeBody()
})()
