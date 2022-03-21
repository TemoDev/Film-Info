import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { Movie } from '../../shared/movie.model';
import { Subscription } from 'rxjs';

import Swiper, {SwiperOptions, Pagination, Autoplay, Navigation} from 'swiper';
Swiper.use([Pagination, Autoplay, Navigation]);

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})


export class NowPlayingComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  nowPlayingMovies: Movie[] = [];

  public swiperConfig: SwiperOptions = {
    pagination: { clickable: true },
    navigation: true,
    autoplay: {
      delay: 3500,
    },
  }

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.subscription = this.movieService.getTMDBMovies('now_playing', 1).subscribe(data => {
      this.nowPlayingMovies = data.results;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
