import {
  Component,
  OnDestroy,
  OnInit, 
} from '@angular/core';
import {
  AuthService
} from '../../auth/auth.service';

import {
  Movie
} from '../../shared/movie.model';
import {
  MovieService
} from '../../shared/movie.service';

import {Subscription} from 'rxjs';
@Component({
  selector: 'app-watch-list-content',
  templateUrl: './watch-list-content.component.html',
  styleUrls: ['./watch-list-content.component.scss']
})
export class WatchListContentComponent implements OnInit {

  movies: Movie[];
  movieKeyId: string;

  isAuthenticated = false;

  counter: number = 0;

  subscription: Subscription;

  constructor(private movieService: MovieService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      // if we have user we are logged in 
      this.isAuthenticated = !!user; //We get true if there is an user, if there is not we get false 

      if(this.isAuthenticated){
        this.subscription = this.movieService.fetchMovies().subscribe(fetchedMovies => {
          this.movies = fetchedMovies;
          // console.log(fetchedMovies);
        })
      }
    });
  }

  removeMovie(selectedMovie: Movie) {
    this.movieService.deleteMovie(selectedMovie['keyId']).subscribe(() => {
      this.movies.splice(this.movies.indexOf(selectedMovie), 1);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // console.log('destroyed')
  }
}
