export class MovieCardsAdapter {
  #selectedItem;
  createElement(obj) {
    let movieCard = document.createElement("movie-card");
    movieCard.setAttributes(
      ["title", "img"],
      [obj.title ? obj.title : obj.name, `https://image.tmdb.org/t/p/w500${obj.poster_path}`]
    );

    movieCard.eid = obj.id;
    movieCard.overview = obj.overview;
    movieCard.rate = obj.vote_average.toFixed(0);
    movieCard.releaseDate = obj.release_date;
    return movieCard;
  }

  #fillElement() {
    document.querySelector('main h1').innerText = this.#selectedItem.title ? this.#selectedItem.title: this.#selectedItem.name;
    document.querySelector('main p').innerText = `Released ${this.#selectedItem.release_date}`;
    document.querySelector('main .overview').innerText = this.#selectedItem.overview;
    document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${this.#selectedItem.poster_path})`
  }

  previewSelectedItem(card) {
    this.#selectedItem = card;
    this.#fillElement();
  }

  setFavorites(saveSaveToStorage){
    saveSaveToStorage(this.#selectedItem.id);
  }

  searchInMoviesCards(text){
    for (const card of document.querySelectorAll('main .movies-list movie-card')) {
      if (card.getAttribute('title').toLowerCase().includes(text.toLowerCase())) card.style.display = 'block';
      else card.style.display = 'none';
    }
  }

  showError(){
    document.querySelector('.error-msg').style.display = 'block';
  }
}
