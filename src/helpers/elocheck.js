const axios = require('axios');

async function getPlayerElo(nickname, game) {
  try {
    const response = await axios.get(`https://open.faceit.com/data/v4/players?nickname=${nickname}&game=${game}`, {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer 0f26688e-6300-4346-94fa-8eaf34f68364', // Replace with your actual API token
      },
    });

    if (response.data) {
      const elo = response.data.games[game].faceit_elo;
      return elo;
    } else {
      throw new Error('Player not found or Elo not available.');
    }
  } catch (error) {
    throw error;
  }
}

// Usage example
const nickname = 'shadi';
const game = 'cs2';

getPlayerElo(nickname, game)
  .then(elo => {
    console.log(`Elo for ${nickname} in ${game}: ${elo}`);
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });
