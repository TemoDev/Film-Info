import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Subscription
} from 'rxjs';

import {
  Movie
} from '../shared/movie.model';
import {
  MovieService
} from '../shared/movie.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  @ViewChild('searchForm') searchForm: ElementRef;

  subscription: Subscription;
  movies: Movie[];
  totalPages: number;
  currentPage = 1;
  filterQueryValue = "";

  searchState: boolean = false;

  searchQuery: string = "";

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Default screen
    this.filterQuery('popular')
  }

  onSubmit() {
    this.currentPage = 1;
    this.searchQuery = this.searchForm['form'].value.searchInput;
    console.log(this.searchQuery);
    this.movieService.TMDBSearch(this.searchQuery, 1).subscribe((movieArr) => {
      this.movies = movieArr.results;
      this.totalPages = 1;
      this.totalPages = movieArr.total_pages;
      console.log(this.totalPages)
    })
    this.searchState = true;
  }

  filterQuery(query: string) {
    this.currentPage = 1;
    this.searchState = false;
    this.filterQueryValue = query;
    this.subscription = this.movieService.getTMDBMovies(query, 1).subscribe((movieArr) => {
      this.movies = movieArr.results;
      this.totalPages = 1;
      this.totalPages = movieArr.total_pages;

      console.log(this.totalPages)
    })
  }

  loadPage(pageNum: number) {
    this.currentPage = pageNum;
    console.log(pageNum);
    if (this.searchState) {
      this.movieService.TMDBSearch(this.searchQuery, pageNum).subscribe((movieArr) => {
        this.movies = movieArr.results;
      })
    } else {
      this.movieService.getTMDBMovies(this.filterQueryValue, pageNum).subscribe((movieArr) => {
        this.movies = movieArr.results;
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
