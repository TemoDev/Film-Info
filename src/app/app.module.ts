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
import { RecentlyAddedComponent } from './home/recently-added/recently-added.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { WatchListComponent } from './watch-list/watch-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarouselComponent,
    MoviesComponent,
    RecentlyAddedComponent,
    MovieDetailComponent,
    WatchListComponent
  ],
  imports: [
    BrowserModule,
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
