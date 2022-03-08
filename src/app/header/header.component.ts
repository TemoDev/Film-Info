import { Component, HostListener, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('navbarCollapse') nav : ElementRef;

  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {

    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/watch-list']);
  }

  toggleNav() {
    this.nav.nativeElement.classList.toggle('show');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 20 ||     
    document.documentElement.scrollTop > 25) {
      document.querySelector('.navbar').classList.add('bg-dark');
    } else{
      document.querySelector('.navbar').classList.remove('bg-dark');

    }
  }

}
