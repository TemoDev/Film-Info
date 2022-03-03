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
import {AuthComponent} from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { WatchListContentComponent } from './watch-list/watch-list-content/watch-list-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarouselComponent,
    MoviesComponent,
    RecentlyAddedComponent,
    MovieDetailComponent,
    WatchListComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    WatchListContentComponent
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
