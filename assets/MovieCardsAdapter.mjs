export class MovieCardsAdapter {
  #selectedItem;
  createElement(obj) {
    let movieCard = document.createElement("movie-card");
    movieCard.setAttributes(
      ["title", "img"],
      [obj.title ? obj.title: obj.name, `https://image.tmdb.org/t/p/w500${obj.poster_path}`]
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

  previewSelectedItem(item) {
    this.#selectedItem = item;
    this.#fillElement();
    this.displayRateWithStarts(item.vote_average);
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

  // used to send movie id to the details page
  getSelectedItemId(){
    return this.#selectedItem.id;
  }

  // used to send tv show name to the details page
  getSelectedItemTitle(){
    console.log(this.#selectedItem.name);
    return this.#selectedItem.name;
  }

  displayRateWithStarts(rate) {
    let NumberOfStars = 1;
    if (rate > 2 && rate <= 4) NumberOfStars = 2;
    if (rate > 4 && rate <= 6) NumberOfStars = 3;
    if (rate > 6 && rate <= 8) NumberOfStars = 4;
    if (rate > 8 && rate <= 10) NumberOfStars = 5;
    for (let i = 0; i < NumberOfStars; i++) {
      document.querySelectorAll(".fa-star")[i].style.color = "yellow";
    }
  }
}
