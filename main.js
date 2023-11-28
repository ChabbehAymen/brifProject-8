import { MovieCard } from "./components/MovieCard.mjs";
import { ApiHandler } from "./repository/ApiHandler.mjs";
import { MovieCardsAdapter } from "./assets/MovieCardsAdapter.mjs";
import storageHandler from "./repository/StorageHandler.mjs";

let movieCardsAdapter = new MovieCardsAdapter();
let apiHandler = new ApiHandler();
customElements.define('movie-card', MovieCard);

apiHandler.fetchMovies((data)=>storageHandler.cacheMovies(data));
apiHandler.fetchTvShows((data)=>{storageHandler.cacheTvShows(data)});
movieCardsAdapter.previewSelectedItem(storageHandler.getMovies()[0]);
createCards(storageHandler.getMovies());

document.querySelector('.home-tab').addEventListener('click', ()=>{
    createCards(storageHandler.getMovies());
})

document.querySelector('.tv-shows-tab').addEventListener('click', ()=>{
    createCards(storageHandler.getTvShows());
})

function createCards(movies){
    let list = document.querySelector('.movies-list');
    list.innerHTML = '';
    for(let movie of movies){
        let movieCard = movieCardsAdapter.createElement(movie);
        movieCard.onClickLinstener(()=>{
            movieCardsAdapter.previewSelectedItem(movie);
        })
        list.appendChild(movieCard);
    }
}
