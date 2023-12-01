import { ApiHandler } from "../repository/ApiHandler.mjs";

let apiHandler = new ApiHandler();
let urlParams = new URLSearchParams(document.location.search);
let itemId = urlParams.get("id");
let tvShowName = urlParams.get('title')
let fetchType = urlParams.get("fetch_type");

if (fetchType == "movie") {
  apiHandler.fetchMovieById(itemId ,(data) => {
    document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`;
    document
      .querySelector("main img")
      .setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500${data.poster_path}`
      );
    document.querySelector("main .content .title h1").innerHTML = data.title;
    document.querySelector("main .content .title .language").innerHTML =
      data.original_language.toUpperCase();
    document.querySelector("main .overview").innerHTML = data.overview;
    data.genres.forEach((genre) => {
      document.querySelector(
        ".tags"
      ).innerHTML += `<i class="tag">${genre.name}</i>`;
    });
    displayRateWithStarts(data.vote_average);
  });
}else{
    apiHandler.fetchTvShowByTitle(tvShowName, data => {
        let movieObj = data.results[0];
        document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movieObj.backdrop_path})`;
        document
          .querySelector("main img")
          .setAttribute(
            "src",
            `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`
          );
        document.querySelector("main .content .title h1").innerHTML = movieObj.name;
        document.querySelector("main .content .title .language").innerHTML =
          movieObj.original_language.toUpperCase();
        document.querySelector("main .overview").innerHTML = movieObj.overview;
        apiHandler.fetchGenresForTvShows(data =>{
            movieObj.genre_ids.forEach((genreId) => {
                createGenre(genreId, data.genres);
            });

        });

        displayRateWithStarts(movieObj.vote_average);
    });
}

function displayRateWithStarts(rate) {
    let NumberOfStars = 1;
    if (rate > 2 && rate <= 4) NumberOfStars = 2;
    if (rate > 4 && rate <= 6) NumberOfStars = 3;
    if (rate > 6 && rate <= 8) NumberOfStars = 4;
    if (rate > 8 && rate <= 10) NumberOfStars = 5;
    for (let i = 0; i < NumberOfStars; i++) {
      document.querySelectorAll(".fa-star")[i].style.color = "yellow";
    }
  }

 function createGenre(genreId, genresList){
    genresList.forEach( G => {
        if (G.id == genreId) {
            document.querySelector(
                ".tags"
              ).innerHTML += `<i class="tag">${G.name}</i>`;
            
        }
    })
  }