import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { Movie } from '../shared/movie.model';
import { MovieService } from '../shared/movie.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  @ViewChild('searchForm') searchForm: ElementRef;

  subscription: Subscription;
  movies : Movie[];
  totalPages = [];

  searchQuery: string = "";
  
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    // console.log(this.search);
    this.subscription = this.movieService.getTMDBMovies('popular').subscribe((movieArr) => {
      this.movies = movieArr;
    })
  }

  onSubmit() {
    this.searchQuery = this.searchForm['form'].value.searchInput;
    console.log(this.searchQuery);
    this.movieService.TMDBSearch(this.searchQuery, 1).subscribe((movieArr) => {
      this.movies = movieArr.results;
      this.totalPages = [];
      for(let pageNum  = 0; pageNum < movieArr.total_pages; pageNum++){
        this.totalPages.push(pageNum+1);
      }
      console.log(this.totalPages)
    })
  }

  filterQuery(query: string){
    this.subscription = this.movieService.getTMDBMovies(query).subscribe((movieArr) => {
      this.movies = movieArr;
    })
  }
  
  loadPage(pageNum: number){
    this.movieService.TMDBSearch(this.searchQuery, pageNum).subscribe((movieArr) => {
      this.movies = movieArr.results;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
