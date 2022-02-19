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

    // Filter Movie by its ID
    this.movie = this.movies.filter(movie=> movie.id == this.movieId)[0];
    this.cast = this.movie.cast;
    console.log(this.cast);
  }

  pushData() {
    const fetchedMovie: Movie = this.movie;
    this.movieService.watchListMovie.push(fetchedMovie);
  }

}
