import { MovieCard } from "./components/MovieCard.mjs";
import { ApiHandler } from "./repository/ApiHandler.mjs";
import { MovieCardsAdapter } from "./repository/MovieCardsAdapter.mjs";
import storageHandler from "./repository/StorageHandler.mjs";

let movieCardsAdapter = new MovieCardsAdapter();
let apiHandler = new ApiHandler();
customElements.define('movie-card', MovieCard);

apiHandler.fetchMovies((data)=>storageHandler.cacheMovies(data));
for(let movie of storageHandler.getMovies().results){
    document.querySelector('.movies-list').appendChild(movieCardsAdapter.createElement(movie));
}

