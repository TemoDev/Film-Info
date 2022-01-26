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

  movie: Movie;
  movieId: number;
  cast: MovieCast[];

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params) => {
      return this.movieId = params['id'];
    })

    // assign movie id to function that fetches selected movie from movie.service.ts
    this.movie = this. movieService.selectedMovie(this.movieId);
    this.cast = this.movie.cast;
  }

  pushData(id: number) {
    this.movieService.addSelectedMovie(id);
  }

}
