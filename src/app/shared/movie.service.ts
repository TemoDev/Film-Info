import {
  Injectable
} from '@angular/core';

import {
  Movie
} from './movie.model';
import {
  MovieCast
} from './cast.model';

@Injectable()
export class MovieService {
  private movies: Movie[] = [
    new Movie(0, 'Spider-Man: No Way Home', `With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.`, 'Action, Thriller', 8.8, 'December 17, 2021', 'English', 20.5, 'https://www.cnet.com/a/img/Tpb3FtkoNsKgyVG6KEKNaVq6JT0=/940x0/2021/11/29/82fb5acc-9155-4844-be9c-e0831a6b837c/nowayhome.jpg',
      [
        new MovieCast('Tom Holland', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKRizGW6Md-BUD5MchQ_UWgYZVKwNQxoPzQte9r0fwSQzBV6h'),
        new MovieCast('Tobey Maguire', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR8aL--nXG15st6MG-nAXulnYh0tAOg4qgNfhYhF8UOFxpMoLNX'),
      ]),
    new Movie(1, 'Red Notice', `In the world of international crime, an Interpol agent attempts to hunt down and capture the world's most wanted art thief.`, 'Action, Thriller, Drama', 6.4, 'September 14, 2021', 'English', 14.6, 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABbR-nSp2Yb60VN2KH-T2Q0waTmBY8xNlVrdaMj-ogKxkqtDI--frpa7Sn_LRnaT0EmYb-KIAh3--aj9ngy2MhAENI-Ul.jpg?r=afe',
      [
        new MovieCast('Gal Gadot', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSHfVk6KNx4Ocy5sVJwo0PqVz_g01OM9k2_MNfzTVK07yABwLBi'),
        new MovieCast('Dwayne Johnson', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYYTLgX6ZLrYwz-3c7iB3gVs87jIKnbbg3Ba-Gt8ykJF2uZgu4'),
      ])
  ];

  private WatchListMovies: Movie[];

  // Here we return the copy of the array written above. I use it in carousel.component.ts to 
  getMovies() {
    return this.movies.slice();
  }

  selectedMovie(id: number) {
    return this.movies[id];
  }

  addSelectedMovie(id: number) {
    // return console.log(this.WatchListMovies.push(this.movies[id]));
    if (this.movies.some(e => e.id === id)) {
      this.WatchListMovies.push(this.movies[id]);
    }
    console.log(this.WatchListMovies);
  }

  // returnWatchListArr() {
  //     return this.WatchListMovies;
  // }

}
