export class ApiHandler {
  #moviesApiPage = 1;
  #tvApiPage = 1;

  fetchMovies(cacheData) {
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${this.#moviesApiPage}&api_key=bb8ac0f28b29e5bc50ad9e8ef9134ec8`)
      .then((response) => {
        if (response.ok) {
            return response.json();
        }
      })
      .then((data) => {
        cacheData(data)
      });
  }

  fetchTvShows(cacheData) {
    fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${this.#tvApiPage}&api_key=bb8ac0f28b29e5bc50ad9e8ef9134ec8`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cacheData(data);
      });
  }

  fetchMoviesNextPage(cacheData){
    this.#moviesApiPage++;
    this.fetchMovies(data=>cacheData(data));
  }

  fetchMoviesPrevPage(cacheData){
    this.#moviesApiPage--;
    this.fetchMovies(data => cacheData(data));
  }

  fetchTvShowsNextPage(cacheData){
    this.#tvApiPage++;
    this.fetchTvShows(data =>cacheData(data));
  }

  fetchTvShowsPrevPage(cacheData){
    this.#tvApiPage--;
    this.fetchMovies(data => cacheData(data));
  }

  fetchMovieById(title){
    fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${this.#moviesApiPage}`)
      .then((response) => {
        if (response.ok) {
            return response.json();
        }
      })
      .then((data) => {
        cacheData(data)
      });
  }

}
