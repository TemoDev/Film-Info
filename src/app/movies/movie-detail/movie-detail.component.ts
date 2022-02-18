import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../../shared/movie.service';
import { Movie } from '../../shared/movie.model';
import { MovieCast } from '../../shared/cast.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movies: Movie[];

  movie: Movie;
  movieId: number;
  cast: MovieCast[];

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params) => {
      return this.movieId = params['id'];
    })

    this.movies = this.movieService.getMovies();
    // assign movie id to function that fetches selected movie from movie.service.ts

    this.movie = this.movies.filter(movie=> movie.id == this.movieId)[0];
    console.log(this.movie.cast)
  }

  pushData() {
    const fetchedMovie: Movie = this.movie;
    this.movieService.watchListMovie.push(fetchedMovie);
  }

}
