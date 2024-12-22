window.onscroll = function () {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 25) {
    navbar.classList.add("sticky-nav");
  } else {
    navbar.classList.remove("sticky-nav");
  }
};

let data = document.getElementById("row-data");
let descrption = document.getElementById("descrption");
const ligtContainer = document.getElementById("ligt-container");

data.addEventListener("click", async (e) => {
  const item = e.target.closest(".iteam");
  if (item) {
    const gameId = item.getAttribute("data-id"); 
    await x.getDetail(gameId);
    x.displayDetails();
    ligtContainer.classList.replace("d-none", "d-block");

    document.getElementById("close").addEventListener("click", () => {
      ligtContainer.classList.replace("d-block", "d-none");
    });
  }
});

class Game {
  cartona = "";
  games = [];
  gameDesc = {};

  async getGame(cat = "mmorpg") {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b041fa910cmsh4b21ae3bbcb207dp1580ebjsna385bfa8dfd0",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`,
      options
    );
    this.games = await api.json();
  }

  async getDetail(id) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b041fa910cmsh4b21ae3bbcb207dp1580ebjsna385bfa8dfd0",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const url = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    this.gameDesc = await url.json();
  }

  display() {
    this.cartona = ""; 
    for (let i = 0; i < this.games.length; i++) {
      this.cartona += `
      <div class="col-md-3">
        <div class="iteam" data-id="${this.games[i].id}">
          <div class="card bg-dark">
            <img src="${this.games[i].thumbnail}" class="card-img-top" alt="${this.games[i].title}">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title text-white">${this.games[i].title}</h5>
                <button class="top-card-btn btn">Free</button>
              </div>
              <p class="text-center m-3 text-secondary">${this.games[i].short_description}</p>
              <hr class="text-black">
              <div class="btn-botm d-flex justify-content-between">
                <a href="#" class="btn text-white">${this.games[i].genre}</a>
                <a href="#" class="btn text-white">${this.games[i].platform}</a>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }
    data.innerHTML = this.cartona;
  }

  displayDetails() {
    const game = this.gameDesc;
    const detailsHTML = `
      <div class="text-white d-flex justify-content-between my-4">
        <h3>Detail Game</h3>
        <i id="close" class="fa-solid fa-x"></i>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="main-img">
            <img class="" src="${game.thumbnail}" alt="${game.title}">
          </div>
        </div>
        <div class="col-md-8">
          <div class="info-detail text-white ms-3">
            <h3>Title: ${game.title}</h3>
            <p>category: <span class="bg-info text-black p-1 rounded-3">${game.genre}</span></p>
            <p>platform: <span class="bg-info text-black p-1 rounded-3">${game.platform}</span></p>
            <p>status: <span class="bg-info text-black p-1 rounded-3">${game.status}</span></p>
            <p>${game.description}</p>
            <button class="btn btn-outline-warning text-white"><a href="${game.game_url}">Show Game</a></button>
          </div>
        </div>
      </div>`;
    descrption.innerHTML = detailsHTML;
  }
}

let x = new Game();
x.getGame('mmorpg').then(() => {
  x.display();
});


let links = document.querySelectorAll('.my_links');

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();  

    links.forEach((link) => link.classList.remove('active'));

    e.target.classList.add('active');

    const category = e.target.textContent.toLowerCase();

    x.getGame(category).then(() => {
      x.display();
    });
  });
});

