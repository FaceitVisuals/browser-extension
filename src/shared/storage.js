import OptionsSync from 'webext-options-sync'

import { DEFAULTS } from './settings'


const storage = new OptionsSync()

defaults: DEFAULTS

export default storage
