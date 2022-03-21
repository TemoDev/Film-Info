import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { Movie } from '../../shared/movie.model';
import { Subscription } from 'rxjs';

import Swiper, {SwiperOptions, Pagination, Autoplay, Navigation} from 'swiper';
Swiper.use([Pagination, Autoplay, Navigation]);

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  upcomingMovies: Movie[] = [];

  public swiperConfig: SwiperOptions = {
    pagination: { clickable: true },
    navigation: true,
    autoplay: {
      delay: 3500,
    },
  }

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.subscription = this.movieService.getTMDBMovies('upcoming', 1).subscribe(data => {
      this.upcomingMovies = data.results;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
