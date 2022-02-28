import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import {
  Injectable
} from "@angular/core";
import {
  catchError,
  tap,
  take,
  exhaustMap
} from "rxjs/operators";
import {
  BehaviorSubject,
  throwError
} from "rxjs";
import {
  User
} from "./user.model";

export interface AuthResponseData {
  idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered ? : boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject < User > (null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) {}

  userKeyId: string = "";

  signup(email: string, password: string) {
    return this.http.post < AuthResponseData > ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHbEtpkNvjiHfjDq5LCE_EgJo5G7XfieM', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuth(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        )
        this.createUserDB(email).subscribe((value)=> {
          this.userKeyId = value['name'];
        });
      })
    );
  }

  private createUserDB(email: string){
    return this.user.pipe(take(1), exhaustMap((user) => {
      return this.http.post('https://film-info-78379-default-rtdb.firebaseio.com/users.json', { email: email, movies : [] },
      {
        params: new HttpParams().set('auth', user.token)
      });
    }))
  }

  private updateUserIdToken(email: string){
    return this.user.pipe(take(1), exhaustMap((user) => {
      return this.http.get('https://film-info-78379-default-rtdb.firebaseio.com/users.json',
      {
        params: new HttpParams().set('auth', user.token)
      });
    }))
  }

  login(email: string, password: string) {
    return this.http.post < AuthResponseData > ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHbEtpkNvjiHfjDq5LCE_EgJo5G7XfieM', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuth(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        )
        this.updateUserIdToken(email).subscribe((responseData) => {
          const userArr = [];
          const fetchedEmail = email;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              userArr.push({
                ...responseData[key],
                keyId: key
              });
            }
          }
          this.userKeyId = userArr.filter(name => {
            return name['email'] === fetchedEmail;
          })[0].keyId;
        });
      })
    );
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    //   Check if user's token is valid
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');

    // clear tokenExpirationTimer
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  //  expirationDuration gives time in milliseconds util token expires
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const createdUser = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(createdUser);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(createdUser));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error occured!";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "The email address already exists.";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMessage = "Password sign-in is disabled for this project.";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "There is no user record corresponding to this identifier.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password or email is incorrect.";
        break;
      case "USER_DISABLED":
        errorMessage = "The user account has been disabled by an administrator.";
        break;
    }
    return throwError(errorMessage);
  }

}
