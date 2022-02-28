import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  
    this.movieService.getTMDBMovies().subscribe(movie => {
      console.log(movie);
    })

  }

}
