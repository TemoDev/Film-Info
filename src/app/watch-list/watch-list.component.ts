import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Movie } from '../shared/movie.model';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  movies: Movie[];
  movieKeyId: string;

  isAuthenticated = false;

  constructor(private movieService: MovieService, private authService: AuthService) { }

  ngOnInit(): void {  
    this.authService.user.subscribe(user => {
      // if we have user we are logged in 
      this.isAuthenticated = !!user; //We get true if there is an user, if there is not we get false 
      console.log(this.isAuthenticated)
      if(this.isAuthenticated){
        this.movieService.fetchMovies().subscribe(fetchedMovies => {
          this.movies = fetchedMovies;
          console.log(fetchedMovies);
        })
      }
      });
  }

  removeMovie(selectedMovie: Movie) {
    this.movieService.deleteMovie(selectedMovie['keyId']).subscribe(()=> {
      this.movies.splice(this.movies.indexOf(selectedMovie), 1);
    });
  }
}
