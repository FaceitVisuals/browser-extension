import { h } from 'dom-chef'
import select from 'select-dom'
import {
  hasFeatureAttribute,
  setFeatureAttribute
} from '../../../helpers/dom-element'
// import { getQuickMatch, getMatch, getPlayerStats } from '../helpers/faceit-api'
// import createPlayerStatsElement from '../components/player-stats'
// import createEloElement from '../components/elo'
import { isLoggedIn } from '../../../helpers/user'


const FEATURE_ATTRIBUTE = 'player-stats'

export const AddStatsToMembers = async () => {
  if (!isLoggedIn()) {
    return
  }

  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (!(mutation.target instanceof HTMLElement)) continue

      const table = mutation.target.querySelector('table')
      if (table) {
        const tbody = table.querySelector('tbody')
        if (tbody) {
          const rows = tbody.querySelectorAll('tr')
          rows.forEach((item) => {
            item.children[2]?.firstElementChild?.insertAdjacentHTML(
              'beforeend',
              `<span>TEST</span>`
            )
          })
        }
        break
      }
    }
  }).observe(document.body, {
    childList: true,
    subtree: true
  })
}

export default AddStatsToMembers