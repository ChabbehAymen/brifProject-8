// TODO hide pager when the favorite tab is selected
//  
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

if (storageHandler.getMovies()) {
  createCards(storageHandler.getMovies());
  movieCardsAdapter.previewSelectedItem(storageHandler.getMovies()[0]);
} else movieCardsAdapter.showError();

document.querySelector(".home-tab").addEventListener("click", (e) => {
  createCards(storageHandler.getMovies());
  movieCardsAdapter.previewSelectedItem(storageHandler.getMovies()[0]);
  hilightSelectedTab(e.target);
});

document.querySelector(".tv-shows-tab").addEventListener("click", (e) => {
  let shows = storageHandler.getTvShows();
  createCards(shows);
  movieCardsAdapter.previewSelectedItem(shows[0]);
  hilightSelectedTab(e.target);
});

document.querySelector(".favorite-tab").addEventListener("click", (e) => {
  hilightSelectedTab(e.target);
  let favorites = storageHandler.getFavorites();
  createCards(favorites);
  movieCardsAdapter.previewSelectedItem(favorites[0]);
});

document.querySelector("main .favorite-btn").addEventListener("click", (e) => {
  movieCardsAdapter.setFavorites((id) => storageHandler.saveFavorites(id));
});

document.querySelector("header label input").addEventListener("input", (e) => {
  movieCardsAdapter.searchInMoviesCards(e.target.value);
});

document
  .querySelector("main .pagination .fa-chevron-down")
  .addEventListener("click", () => {
    console.log();
    console.log();
    switch (true) {
      case isTabSelected(document.querySelector(".home-tab")):
        apiHandler.fetchMoviesNextPage(storageHandler.cacheMovies());
        createCards(storageHandler.getMovies());
        break;
      case isTabSelected(document.querySelector(".tv-shows-tab")):
        apiHandler.fetchTvShowsNextPage(storageHandler.cacheTvShows());
        createCards(storageHandler.getTvShows());
        break;
    }
  });

  function isTabSelected(tab) {
    let isSelected = false;
    tab.classList.forEach( c => {
      if (c == 'selected') isSelected = true;
    });
    return isSelected;
  }

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
