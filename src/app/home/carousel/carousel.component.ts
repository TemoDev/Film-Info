import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/movie.model';
import { MovieService } from 'src/app/shared/movie.service';

import Swiper, {SwiperOptions, Pagination, Autoplay} from 'swiper';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  movies: Movie[];

  public swiperConfig: SwiperOptions = {
    pagination: { clickable: true },
    loop: true,
    autoplay: {
      delay: 2000,
    },
  }

  constructor( public movieService: MovieService) { }

  ngOnInit(): void {
    Swiper.use([Pagination, Autoplay]);

    this.movies = this.movieService.getMovies();
  }

}
