import { getMatch } from '../../helpers/faceit-api';
import { getRoomId } from '../../helpers/match-room';



 function getAPIUserIds() {
    const _userIds = []
    const roomId = getRoomId()

    if (roomId) {
      const match =  getMatch(roomId)

      if (match) {
        for (const team in match.teams) {
          for (const user in match.teams[team].roster) {
            const { id, nickname } = match.teams[team].roster[user]
            _userIds.push({ id, nickname })
          }
        }
      }
    }

    return _userIds
  }



 export default getAPIUserIds