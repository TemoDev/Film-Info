import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  loginMode: boolean = false;
  isLoading = false;
  error: string;

  loggedInStatus: false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onFormSubmit(){
    if(!this.form.valid){
      return;
    }
    const email = this.form.form.value.email;
    const pswd = this.form.form.value.pswd;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if(this.loginMode){
      authObs = this.authService.login(email, pswd);
    } else{
      authObs = this.authService.signup(email, pswd);
    }

    authObs.subscribe( 
      resData => {
        this.isLoading = false;
        console.log(resData);
        this.error = "";
      }, errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      });

    this.form.reset();
  }

  switchAuthMode(){
    this.loginMode = !this.loginMode;
  }

}
