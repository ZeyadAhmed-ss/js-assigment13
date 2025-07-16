import { UI } from './UI.Js';


export class Id {
  static async fetchGameById(id) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '398941905emsh1efa1d855ecd3a5p1520bcjsn50175ce80e09',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const game = await response.json();
      UI.displayGameDetails(game);
    } catch (error) {
      console.error(error);
    }
  }
}
