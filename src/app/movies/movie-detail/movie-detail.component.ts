import {
  Component,
  OnInit
} from '@angular/core';
import {
  Subscription
} from 'rxjs';

import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  MovieService
} from '../../shared/movie.service';
import {
  Movie
} from '../../shared/movie.model';
import {
  MovieCast
} from '../../shared/cast.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  isAuthenticated: boolean = false;

  subscription: Subscription;
  movies: Movie[] = [];

  movie: Movie;
  movieId: number;
  cast: MovieCast[];

  movieGenres: string[] = [];


  constructor(private movieService: MovieService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {

    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      // console.log(this.isAuthenticated);
    })

    this.route.params
      .subscribe((params: Params) => {
        return this.movieId = params['id'];
      })

    this.subscription = this.movieService.getTMDBMovies().subscribe((movieArr) => {
      this.movies = movieArr;

      // Filter Movie by its ID
      this.movie = this.movies.filter(movie => movie.id == this.movieId)[0];

    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddMovie(movie: Movie) {
    this.movieService.createAndStoreMovies(movie).subscribe(value => console.log(value));
  }

}
