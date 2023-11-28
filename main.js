import { MovieCard } from "./components/MovieCard.mjs";
import { ApiHandler } from "./repository/ApiHandler.mjs";
import { MovieCardsAdapter } from "./assets/MovieCardsAdapter.mjs";
import storageHandler from "./repository/StorageHandler.mjs";

let movieCardsAdapter = new MovieCardsAdapter();
let apiHandler = new ApiHandler();
let movies = storageHandler.getMovies();
customElements.define('movie-card', MovieCard);

movieCardsAdapter.previewSelectedItem(movies[0])
apiHandler.fetchMovies((data)=>storageHandler.cacheMovies(data));
for(let movie of movies){
    let movieCard = movieCardsAdapter.createElement(movie);
    movieCard.onClickLinstener(()=>{
        movieCardsAdapter.previewSelectedItem(movie);
    })
    document.querySelector('.movies-list').appendChild(movieCard);
}
