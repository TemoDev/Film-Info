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

  moviesSub: Subscription;
  castSub: Subscription;
  movies: Movie[] = [];
  cast: MovieCast[] = [];

  movie: Movie;
  movieId: number;

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

    this.moviesSub = this.movieService.getMovieById(this.movieId).subscribe((resMovie) => {
      this.movie = resMovie;
      this.movie.genres.forEach(value => {
        this.movieGenres.push(value['name'])
      })
    })

    this.castSub = this.movieService.getMovieCredits(this.movieId).subscribe(resData => {
      if(resData.length < 20){
        for(let amount = 0; amount < resData.length; amount++){
          this.cast.push(resData[amount]);
        }
      } else{
        for(let amount = 0; amount < 20; amount++){
          this.cast.push(resData[amount]);
        }
      }    
    })

  }

  ngOnDestroy(): void {
    this.moviesSub.unsubscribe();
    this.castSub.unsubscribe();
  }

  onAddMovie(movie: Movie) {
    this.movieService.createAndStoreMovies(movie).subscribe(value => console.log(value));
  }

}
