import {
  Component,
  OnInit, 
} from '@angular/core';
import {
  AuthService
} from '../auth/auth.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      // if we have user we are logged in 
      this.isAuthenticated = !!user; //We get true if there is an user, if there is not we get false 
    });
  }
}
