import { Component, OnInit } from '@angular/core';

import { Movie } from '../shared/movie.model';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  movies: Movie[];

  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    this.movies = this.movieService.watchListMovie;
    console.log(this.movies);
  }

  removeMovie(value) {
    this.movies.splice(value, 1)
  }

}
