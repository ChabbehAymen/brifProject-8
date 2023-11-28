import { MovieCard } from "./components/MovieCard.mjs";
import { ApiHandler } from "./repository/ApiHandler.mjs";
import { MovieCardsAdapter } from "./assets/MovieCardsAdapter.mjs";
import storageHandler from "./repository/StorageHandler.mjs";

let movieCardsAdapter = new MovieCardsAdapter();
let apiHandler = new ApiHandler();
customElements.define("movie-card", MovieCard);

apiHandler.fetchMovies((data) => storageHandler.cacheMovies(data));
apiHandler.fetchTvShows((data) => {
  storageHandler.cacheTvShows(data);
});

movieCardsAdapter.previewSelectedItem(storageHandler.getMovies()[0]);
createCards(storageHandler.getMovies());

document.querySelector(".home-tab").addEventListener("click", (e) => {
  createCards(storageHandler.getMovies());
  movieCardsAdapter.previewSelectedItem(storageHandler.getMovies()[0]);
    hilightSelectedTab(e.target);
});

document.querySelector(".tv-shows-tab").addEventListener("click", (e) => {
  createCards(storageHandler.getTvShows());
  movieCardsAdapter.previewSelectedItem(storageHandler.getTvShows()[0]);
  hilightSelectedTab(e.target);
});

document.querySelector(".favorite-tab").addEventListener("click", (e) => {
  hilightSelectedTab(e.target);
});

function createCards(movies) {
  let list = document.querySelector(".movies-list");
  list.innerHTML = "";
  for (let movie of movies) {
    let movieCard = movieCardsAdapter.createElement(movie);
    movieCard.onClickLinstener(() => {
      movieCardsAdapter.previewSelectedItem(movie);
    });
    list.appendChild(movieCard);
  }
}

function hilightSelectedTab(target) {
  for (const tab of document.querySelectorAll("header p")) {
    tab.classList.remove("selected");
  }
  target.classList.add("selected");
}
