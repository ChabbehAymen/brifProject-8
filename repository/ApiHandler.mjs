export class ApiHandler {
  #moviesApiPage = 1;
  #tvApiPage = 1;
  #moviesApi = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${this.#moviesApiPage}&api_key=bb8ac0f28b29e5bc50ad9e8ef9134ec8`;
  #tvApi = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${this.#tvApiPage}&api_key=bb8ac0f28b29e5bc50ad9e8ef9134ec8`;

  fetchMovies(cacheData) {
    fetch(this.#moviesApi)
      .then((response) => {
        if (response.ok) {
            return response.json();
        }
      })
      .then((data) => {
        cacheData(data)
      })
      .catch((error) => {
        console.log("fetch Error", error);
      });
  }

  fetchTvShows(cacheData) {
    fetch(this.#tvApi)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cacheData(data);
      });
  }
}
