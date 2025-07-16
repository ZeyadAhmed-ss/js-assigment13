import { UI } from './UI.Js';



export class Game {
  static async fetchGames(category = "") {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '398941905emsh1efa1d855ecd3a5p1520bcjsn50175ce80e09',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      UI.displayGames(result);
    } catch (error) {
      console.error(error);
    }
  }
}
