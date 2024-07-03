import { getPlayerStats } from './faceit-api'

export const getKDAsByMatches = async (matches, game) => {
  const kdAs = {}

  // Iterate over each match
  for (const match of matches) {
    const matchId = match.matchId

    // Fetch match details to get KDA statistics
    const matchDetails = await fetchApiMemoized(`/match/v2/match/${matchId}`)

    // Extract KDA statistics from match details
    const kdaStats = extractKDAStats(matchDetails, game)

    // Store KDA statistics for the match
    kdAs[matchId] = kdaStats
  }

  return kdAs
}

const extractKDAStats = (matchDetails, game) => {
  // Logic to extract KDA statistics from match details based on the game type
  // Implement this logic based on the structure of match details for your specific game
  // Example:
  let kdaStats = null
  if (game === 'cs2') {
    kdaStats = {
      kills: matchDetails.playerStats.kills,
      deaths: matchDetails.playerStats.deaths,
      assists: matchDetails.playerStats.assists
    }
  }
  return kdaStats
}
