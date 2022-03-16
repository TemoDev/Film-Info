import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { Movie } from '../../shared/movie.model';
import { Subscription } from 'rxjs';

import Swiper, {SwiperOptions, Pagination, Autoplay, Navigation} from 'swiper';
Swiper.use([Pagination, Autoplay, Navigation]);

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  topRatedMovies: Movie[] = [];

  public swiperConfig: SwiperOptions = {
    pagination: { clickable: true },
    navigation: true,
    autoplay: {
      delay: 3500,
    },
  }

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.subscription = this.movieService.getTMDBMovies('top_rated').subscribe(data => {
      this.topRatedMovies = data;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
