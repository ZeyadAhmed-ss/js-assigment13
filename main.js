// Class games by category
class Game {
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

// class games by id 
class Id {
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

// Class to handle UI rendering
class UI {
  static displayGames(games) {
    let cartoona = "";
    for (let i = 0; i < games.length; i++) {
      cartoona += `
        <div class="col-md-4 col-lg-3">
          <div class="game-card bg-dark text-white rounded-4 overflow-hidden" data-id="${games[i].id}">
            <img class="w-100" src="${games[i].thumbnail}" alt="${games[i].title}">
            <div class="p-3 d-flex justify-content-between align-items-center">
              <h5 class="mb-0 fs-6">${games[i].title}</h5>
              <span class="badge bg-primary text-white">Free</span>
            </div>
            <div class="px-4 small mb-3" style="opacity: 0.6">
              ${games[i].short_description}
            </div>
            <div class="px-3 pb-3 d-flex justify-content-between">
              <span class="badge bg-secondary">${games[i].genre}</span>
              <span class="badge bg-secondary">${games[i].platform}</span>
            </div>
          </div>
        </div>
      `;
    }
    if (!games || games.length === 0) {
  document.getElementById("row").innerHTML = `<p class="text-white text-center">No games found.</p>`;
  return;
}

    document.getElementById("row").innerHTML = cartoona;

    document.querySelectorAll(".game-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        Id.fetchGameById(id);
      });
    });
  }

  static displayGameDetails(game) {
    const container = document.querySelector(".GameDetailsContainer");
    container.classList.remove("d-none");
    document.getElementById("Gamecontainer").classList.add("d-none");

    container.innerHTML = `
      <div class="row pb-5">
        <div class="col-md-4">
          <img class="w-100 rounded" src="${game.thumbnail}" alt="${game.title}">
          <h3 class="mt-3">${game.title}</h3>
        </div>
        <div class="col-md-8">
          <h3>Description</h3>
          <p>${game.description}</p>

          <h3 class="mt-4">Publisher</h3>
          <h5>${game.publisher}</h5>

          <h3 class="mt-4">Release Date</h3>
          <h5>${game.release_date}</h5>

          <h3 class="mt-4">Platform</h3>
          <h5>${game.platform}</h5>

          <button class="my-custom-btn btn-outline-light mt-4" id="backBtn">Back</button>
          <button class="my-custom-btn mt-4 ms-3" id="showGameBtn">Show Game</button>
        </div>
      </div>
    `;

    document.getElementById("backBtn").addEventListener("click", () => {
      container.classList.add("d-none");
      document.getElementById("Gamecontainer").classList.remove("d-none");
    });

    document.getElementById("showGameBtn").addEventListener("click", () => {
      window.open(game.game_url, "_blank");
    });

    

    container.scrollIntoView({ behavior: "smooth" });
  }

  static setupCategoryListeners() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
      link.addEventListener("click", e => {
        const category = e.target.innerHTML.trim();
        Game.fetchGames(category);
      });
    });

    Game.fetchGames(links[0].innerHTML.trim());
  }

  static setupCategoryListeners() {
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();

        links.forEach(l => l.classList.remove("active"));

        e.target.classList.add("active");

        const category = e.target.textContent.trim().toLowerCase();

      
        Game.fetchGames(category);
      });
    });

    if (links.length > 0) {
      links[0].classList.add("active");
      const firstCategory = links[0].textContent.trim().toLowerCase();
      Game.fetchGames(firstCategory);
    }
  }
}

// Initialize
UI.setupCategoryListeners();

// smooth scroll
const lenis = new Lenis({
  duration: 1.2,     
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  smooth: true,
  smoothTouch: true,
})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}



requestAnimationFrame(raf)