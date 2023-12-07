// TODO MediaQuery
import { MovieCard } from "./components/MovieCard.mjs";
import { ApiHandler } from "./repository/ApiHandler.mjs";
import { MovieCardsAdapter } from "./assets/MovieCardsAdapter.mjs";
import storageHandler from "./repository/StorageHandler.mjs";

let movieCardsAdapter = new MovieCardsAdapter();
let apiHandler = new ApiHandler();
customElements.define("movie-card", MovieCard);
let prevPage = document.querySelector(".prev-page");
let currentPage = document.querySelector(".current-page");
let nextPage = document.querySelector(".next-page");

apiHandler.fetchMovies((data) => {
  createCards(data.results);
  storageHandler.cacheMovies(data);
});
apiHandler.fetchTvShows((data) => {
  storageHandler.cacheTvShows(data);
});

document.querySelector(".home-tab").addEventListener("click", (e) => {
  createCards(storageHandler.getMovies());
  movieCardsAdapter.previewSelectedItem(storageHandler.getMovies()[0]);
  hilightSelectedTab(e.target);
  initPages(apiHandler.getMoviesPage());
});

document.querySelector(".tv-shows-tab").addEventListener("click", (e) => {
  let shows = storageHandler.getTvShows();
  createCards(shows);
  hilightSelectedTab(e.target);
  initPages(apiHandler.getTvShowsPage());
});

document.querySelector(".favorite-tab").addEventListener("click", (e) => {
  if (localStorage.getItem('favorites')) {
    createCards(storageHandler.getFavorites());
    hilightSelectedTab(e.target);
  }
});

document.querySelector("main .favorite-btn").addEventListener("click", (e) => {
  movieCardsAdapter.setFavorites((id) => storageHandler.saveFavorites(id));
});

document.querySelector(".show-info-btn").addEventListener("click", (e) => {
  if (document.querySelector(".home-tab").classList.contains("selected")) {
    window.location.href = `detailPage/detailPage.html?id=${movieCardsAdapter.getSelectedItemId()}&title=null&fetch_type=movie`;
  } else {
    window.location.href = `detailPage/detailPage.html?id=null&title=${movieCardsAdapter.getSelectedItemTitle()}&fetch_type=tv`;
  }
});

document.querySelector("header label input").addEventListener("input", (e) => {
  movieCardsAdapter.searchInMoviesCards(e.target.value);
});

document
  .querySelector("main .pagination .fa-chevron-up")
  .addEventListener("click", () => {
    if (document.querySelector(".current-page").innerHTML != 1) {
      if (document.querySelector(".home-tab").classList.contains("selected")) {
        apiHandler.fetchMoviesPrevPage((data) => {
          displayAndCacheMoviesPageData(data);
          decricePage();
        });
      } else {
        apiHandler.fetchTvShowsPrevPage((data) => {
          displayAndCacheTvPageData(data);
          decricePage();
        });
      }
    }
  });

document
  .querySelector("main .pagination .fa-chevron-down")
  .addEventListener("click", (e) => {
    if (document.querySelector(".home-tab").classList.contains("selected")) {
      apiHandler.fetchMoviesNextPage((data) => {
        displayAndCacheMoviesPageData(data);
        incresePage();
      });
    } else {
      apiHandler.fetchTvShowsNextPage((data) => {
        displayAndCacheTvPageData(data);
        incresePage();
      });
    }
  });

function displayAndCacheMoviesPageData(data) {
  createCards(data.results);
  storageHandler.cacheMovies(data);
}

function displayAndCacheTvPageData(data) {
  createCards(data.results);
  storageHandler.cacheTvShows(data);
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
  movieCardsAdapter.previewSelectedItem(movies[0]);
}

function hilightSelectedTab(target) {
  for (const tab of document.querySelectorAll("header p")) {
    tab.classList.remove("selected");
  }
  target.classList.add("selected");
  if (target.classList.contains("favorite-tab")) {
    document.querySelector(".pagination").style.display = "none";
    document.querySelector(".show-info-btn").style.display = "none";
    document.querySelector(".favorite-btn").style.display = "none";
  } else {
    document.querySelector(".pagination").style.display = "block";
    document.querySelector(".show-info-btn").style.display = "block";
    document.querySelector(".favorite-btn").style.display = "block";
  }
}

function initPages(page) {
  if (page == 1) prevPage.innerHTML = "";
  else prevPage.innerHTML = page - 1;
  currentPage.innerHTML = page;
  nextPage.innerHTML = page + 1;
}

function incresePage() {
  if (prevPage.innerHTML == "") prevPage.innerHTML = 1;
  else prevPage.innerHTML = parseInt(prevPage.innerHTML) + 1;

  currentPage.innerHTML = parseInt(currentPage.innerHTML) + 1;
  nextPage.innerHTML = parseInt(nextPage.innerHTML) + 1;
}

function decricePage() {
  if (prevPage.innerHTML == 1) prevPage.innerHTML = "";
  else prevPage.innerHTML = parseInt(prevPage.innerHTML) - 1;

  currentPage.innerHTML = parseInt(currentPage.innerHTML) - 1;
  nextPage.innerHTML = parseInt(nextPage.innerHTML) - 1;
}
