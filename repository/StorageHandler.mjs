let instance;
class StorageHandler{
    #moviesStorageKey = 'movies';
    #tvShowStorageKey = 'tv-shows'
    #movies = [];
    #tvShows = [];
    
    constructor(){
        if(instance) return instance
        else instance = this;
    }

    cacheMovies(data){
        localStorage.setItem(this.#moviesStorageKey, JSON.stringify(data));
    }

    cacheTvShows(data){
        localStorage.setItem(this.#tvShowStorageKey, JSON.stringify(data));
    }

    getMovies(){
        this.#movies = JSON.parse(localStorage.getItem(this.#moviesStorageKey)).results;
        return this.#movies
    }

    getTvShows(){
        this.#tvShows = JSON.parse(localStorage.getItem(this.#tvShowStorageKey)).results;
        return this.#tvShows;
    }

    getMovieById(id){
        return this.#searchInList(this.#movies, id)? this.#searchInList(this.#movies, id) : this.#searchInList(this.#tvShows, id);
    }

    #searchInList(list, id){
        for (const movie of list) {
            if (movie.id == id) {
                return movie;
            }
        }
    }
}

const storageHandler = new StorageHandler();

export default storageHandler;