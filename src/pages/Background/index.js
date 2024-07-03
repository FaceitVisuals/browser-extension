import browser from 'webextension-polyfill'
import {

  ACTION_FETCH_FACEIT_API,


} from '../../shared/constants'
import faceitApii from '../../helpers/faceit-api'

 

browser.runtime.onMessage.addListener(async message => {
  if (!message) {
    return
  }

  switch (message.action) {

    
    case ACTION_FETCH_FACEIT_API: {
      try {
        const { path, options } = message
        const response = await faceitApii(path, options)
        return response
      } catch (error) {
        console.error(error)
        return null
      }
    }
   
  }
})


