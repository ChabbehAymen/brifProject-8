import { MovieCard } from "./components/MovieCard.mjs";
import { ApiHandler } from "./repository/ApiHandler.mjs";
import { MovieCardsAdapter } from "./repository/MovieCardsAdapter.mjs";
import storageHandler from "./repository/StorageHandler.mjs";

let movieCardsAdapter = new MovieCardsAdapter();
let apiHandler = new ApiHandler();
let movies = storageHandler.getMovies().results;
customElements.define('movie-card', MovieCard);

movieCardsAdapter.previewSelectedItem(movies[0])
apiHandler.fetchMovies((data)=>storageHandler.cacheMovies(data));
for(let movie of movies){
    document.querySelector('.movies-list').appendChild(movieCardsAdapter.createElement(movie));
}

