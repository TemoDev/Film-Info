import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {  
    this.movieService.fetchMovies().subscribe(fetchedMovies => {
      this.movies = fetchedMovies;
      console.log(fetchedMovies);
    })
  }

  removeMovie(selectedMovie: Movie) {
    this.movieService.deleteMovie(selectedMovie['keyId']).subscribe(()=> {
      this.movies.splice(this.movies.indexOf(selectedMovie), 1);
    });
  }
}
