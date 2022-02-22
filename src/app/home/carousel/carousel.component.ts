import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/movie.model';
import { MovieService } from 'src/app/shared/movie.service';

import Swiper, {SwiperOptions, Pagination, Autoplay} from 'swiper';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  movies: Movie[] = [];

  public swiperConfig: SwiperOptions = {
    pagination: { clickable: true },
    autoplay: {
      delay: 2000,
    },
  }

  constructor( public movieService: MovieService) { }

  ngOnInit(): void {
    Swiper.use([Pagination, Autoplay]);

    this.subscription = this.movieService.getTMDBMovies().subscribe((movieArr) => {
      
      // Get top 5 the most popular movies
      for(let amount = 0; amount < 5; amount++ ){
        this.movies.push(movieArr[amount]);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
