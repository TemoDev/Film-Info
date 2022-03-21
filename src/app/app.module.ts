import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { MoviesComponent } from './movies/movies.component';
import { SwiperModule } from 'swiper/angular';
import { MovieService } from './shared/movie.service';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import {AuthComponent} from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { WatchListContentComponent } from './watch-list/watch-list-content/watch-list-content.component';
import { CustomShortenPipe } from './home/carousel/custom-shorten.pipe';
import { ConvertGenresPipe } from './shared/convertGenres.pipe';
import { NowPlayingComponent } from './home/now-playing/now-playing.component'
import { PopularComponent } from './home/popular/popular.component'
import { TopRatedComponent } from './home/top-rated/top-rated.component'
import { UpcomingComponent } from './home/upcoming/upcoming.component';
import { FooterComponent } from './footer/footer.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarouselComponent,
    MoviesComponent,
    MovieDetailComponent,
    WatchListComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    WatchListContentComponent,
    CustomShortenPipe,
    ConvertGenresPipe,
    NowPlayingComponent,
    PopularComponent,
    TopRatedComponent,
    UpcomingComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
  ],
  providers: [
    MovieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
