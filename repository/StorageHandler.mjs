let instance;
class StorageHandler {
  #moviesStorageKey = "movies";
  #tvShowStorageKey = "tv-shows";
  #favoritesStorageKey = "favorites";
  #movies = [];
  #tvShows = [];

  constructor() {
    if (instance) return instance;
    else instance = this;
  }

  cacheMovies(data) {
    localStorage.setItem(this.#moviesStorageKey, JSON.stringify(data));
  }

  cacheTvShows(data) {
    localStorage.setItem(this.#tvShowStorageKey, JSON.stringify(data));
  }

  getMovies() {
    if (localStorage.getItem(this.#moviesStorageKey)) {
      this.#movies = JSON.parse(
        localStorage.getItem(this.#moviesStorageKey)
      ).results;
      return this.#movies;
    }
    return 0;
  }

  getTvShows() {
    this.#tvShows = JSON.parse(
      localStorage.getItem(this.#tvShowStorageKey)
    ).results;
    return this.#tvShows;
  }

  saveFavorites(id) {
    if (localStorage.getItem(this.#favoritesStorageKey)) {
      let favoritesIds = JSON.parse(
        localStorage.getItem(this.#favoritesStorageKey)
        );

      if(!this.#isIdInList(id, favoritesIds)) favoritesIds.push(id);

      localStorage.setItem(
        this.#favoritesStorageKey,
        JSON.stringify(favoritesIds)
      );
    } else
      localStorage.setItem(this.#favoritesStorageKey, JSON.stringify([id]));
  }

  #isIdInList(id, list){
    let isId = false
    for (const ID of list)
        if (ID == id) isId = true;
    return isId   
  }

  getFavorites() {
    let favorites = [];
    if (JSON.parse(localStorage.getItem(this.#favoritesStorageKey))) {
      for (const id of JSON.parse(localStorage.getItem(this.#favoritesStorageKey))) {
        favorites.push(this.getMovieById(id));
      }
      return favorites;
    }else return favorites
  }

  getMovieById(id) {
    let movies = this.#searchInMovies(id);
    if (movies == null) {
      return this.#searchInShows(id);
    }
    return movies;
  }

  #searchInMovies(id) {
    let movie = null;
    for (let i = 0; i < this.#movies.length; i++) {
      if (this.#movies[i].id == id) movie = this.#movies[i];
    }
    return movie;
  }

  #searchInShows(id) {
    let shows = null;
    for (let i = 0; i < this.#movies.length; i++) {
      if (this.#movies[i].id == id) shows = this.#tvShows[i];
    }
    return shows;
  }
}

const storageHandler = new StorageHandler();

export default storageHandler;
