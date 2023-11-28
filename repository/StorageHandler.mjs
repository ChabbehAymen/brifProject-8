let instance;
class StorageHandler{
    #moviesStorageKey = 'movies';
    constructor(){
        if(instance) return instance
        else instance = this;
    }
    cacheMovies(data){
        localStorage.setItem(this.#moviesStorageKey, JSON.stringify(data))
    }

    getMovies(){
        return JSON.parse(localStorage.getItem(this.#moviesStorageKey));
    }
}

const storageHandler = new StorageHandler();

export default storageHandler;