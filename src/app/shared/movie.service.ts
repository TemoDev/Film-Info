import {  Injectable } from '@angular/core';
import {  Movie} from './movie.model';
import { MovieCast } from './cast.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MovieService {

  constructor(private http: HttpClient){}
  watchListMovie: Movie[] = [];

  getTMDBMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=0e40baa3cc7b3ab4defbfaa75a5bd98d&language=en-US&page=1').pipe(
      map( (responseData) => {
      const responseMovie = responseData['results'];
      console.log(responseMovie)
      const movies: Movie[] = [];
      for(const movie of responseMovie){
        movies.push(
          new Movie(
            movie.id, 
            movie.original_title, 
            movie.overview, 
            movie.genre_ids,
            movie.vote_average, 
            movie.release_date, 
            movie.original_language, 
            movie.vote_count, 
            `https://image.tmdb.org/t/p/original` + movie.backdrop_path))
      }
      return movies;
    } ));
  }

  getGenres() {
    return this.http.get(` https://api.themoviedb.org/3/genre/movie/list?api_key=0e40baa3cc7b3ab4defbfaa75a5bd98d&language=en-US`).subscribe(value => {
      console.log(value['genres']);
    })
  }

  getGenre(genreId){
    let genreName;
    switch (genreId){
      case 28: 
        genreName = "Action";
        break;
      case 12: 
        genreName = "Adventure";
        break;
      case 16: 
        genreName = "Animation";
        break;
      case 35: 
        genreName = "Comedy";
        break;
      case 80: 
        genreName = "Crime";
        break;
      case 99:  
        genreName = "Documentary";
        break;
      case 18: 
        genreName = "Drama";
        break;
      case 10751:
        genreName = "Family";
        break;
      case 14: 
        genreName = "Fantasy";
        break;
      case 36: 
        genreName = "History";
        break;
      case 27:  
        genreName = "Horror";
        break;
      case 10402:
        genreName = "Music";
        break;
      case 9648: 
        genreName = "Mystery";
        break;
      case 10749: 
        genreName = "Romance";
        break;
      case 878:
        genreName = "Science Fiction";
        break;
      case 10770:
        genreName = "TV Movies";
        break;
      case 53:
        genreName = "Thriller";
        break;
      case 10752: 
        genreName = "War";
        break;
      case 37: 
        genreName = "Wester";
        break;    
    }
    return genreName;
  }

  createAndStoreMovies(movie: Movie){
    this.http.post<{name: string}>('https://film-info-78379-default-rtdb.firebaseio.com/movie.json', movie)
    .subscribe(value => console.log(value))
  }

  fetchMovies() {
    return this.http.get<{[key: string]: Movie}>('https://film-info-78379-default-rtdb.firebaseio.com/movie.json')
    .pipe(
      map( responseData => {
        const movieArray: Movie[] = [];

        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            movieArray.push({...responseData[key], keyId:key});
          }
        }
        return movieArray;
      } )
    );
  }

  deleteMovie(movieId: string){
    return this.http.delete(`https://film-info-78379-default-rtdb.firebaseio.com/movie/${movieId}.json`);
  }

  console.log("auth");

}

