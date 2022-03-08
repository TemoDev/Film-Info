import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Movie } from '../shared/movie.model';
import { MovieService } from '../shared/movie.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  movies : Movie[];
  
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.subscription = this.movieService.getTMDBMovies().subscribe((movieArr) => {
      this.movies = movieArr;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
