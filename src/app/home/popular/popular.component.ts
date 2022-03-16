import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { Movie } from '../../shared/movie.model';
import { Subscription } from 'rxjs';

import Swiper, {SwiperOptions, Pagination, Autoplay, Navigation} from 'swiper';
Swiper.use([Pagination, Autoplay, Navigation]);

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  popularMovies: Movie[] = [];

  public swiperConfig: SwiperOptions = {
    pagination: { clickable: true },
    navigation: true,
    autoplay: {
      delay: 3500,
    },
  }

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.subscription = this.movieService.getTMDBMovies('popular').subscribe(data => {
      this.popularMovies = data;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
