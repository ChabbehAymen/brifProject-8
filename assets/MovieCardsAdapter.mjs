export class MovieCardsAdapter {
  #selectedItem;
  createElement(obj) {
    let movieCard = document.createElement("movie-card");
    movieCard.setAttributes(
      ["title", "img"],
      [obj.title, `https://image.tmdb.org/t/p/w500${obj.poster_path}`]
    );
    movieCard.eid = obj.id;
    movieCard.overview = obj.overview;
    movieCard.rate = obj.vote_average.toFixed(0);
    movieCard.releaseDate = obj.release_date;
    return movieCard;
  }

  #fillElement() {
    document.querySelector('main h1').innerText = this.#selectedItem.title;
    document.querySelector('main p').innerText = `Released ${this.#selectedItem.release_date}`;
    document.querySelector('main .overview').innerText = this.#selectedItem.overview;
    document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${this.#selectedItem.poster_path})`
  }

  previewSelectedItem(obj) {
    this.#selectedItem = obj;
    this.#fillElement();
  }
}
