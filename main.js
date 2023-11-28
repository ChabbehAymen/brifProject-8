import { MovieCard } from "./components/MovieCard.mjs";
import { ApiHandler } from "./repository/ApiHandler.mjs";
import storageHandler from "./repository/StorageHandler.mjs";

let apiHandler = new ApiHandler();
customElements.define('movie-card', MovieCard);

apiHandler.fetchMovies((data)=>storageHandler.cacheMovies(data));
for(let movie of storageHandler.getMovies()){
    document.createElement()
}

