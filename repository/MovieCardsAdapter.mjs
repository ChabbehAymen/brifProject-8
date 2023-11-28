export class MovieCardsAdapter{

    createElement(obj){
        let movieCard = document.createElement('movie-card');
        movieCard.setAttributes(['title', 'img'],[obj.title,`https://image.tmdb.org/t/p/w500${obj.poster_path}`]);
        movieCard.eid = obj.id;
        movieCard.overview = obj.overview;
        movieCard.rate = obj.vote_average;
        movieCard.releaseDate = obj.release_date;
        return movieCard;
    }
}