import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  pipe,
  catchError,
  throwError,
  Subject,
  tap,
  BehaviorSubject,
} from 'rxjs';
import { User } from './user.model';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

enum ERROR_CODE {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  USER_DISABLED = 'USER_DISABLED',
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private timer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${environment.FIREBASE_AUTH_URL}:signUp?key=${environment.FIREBASE_API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap((resData) => {
          this.handleAuthenticatio(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(
        new authActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
        })
      );
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleAuthenticatio(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    // this.user.next(user);
    this.store.dispatch(
      new authActions.AuthenticateSuccess({
        email,
        userId,
        token,
        expirationDate: expirationDate,
      })
    );
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${environment.FIREBASE_AUTH_URL}:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap((resData) => {
          this.handleAuthenticatio(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new authActions.Logout());
    // this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = null;
  }

  autoLogout(expirationDuration: number) {
    this.timer = setTimeout(() => {
      // this.logout();
      this.store.dispatch(new authActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = this.generateErrorMessage(errorRes);

    return throwError(errorMessage);
  }

  private generateErrorMessage(errorRes) {
    console.log(errorRes);
    let errorMessage = 'An error occured';

    if (!errorRes.error || !errorRes.error.error) {
      return errorMessage;
    }

    switch (ERROR_CODE[errorRes.error.error.message]) {
      case ERROR_CODE.EMAIL_EXISTS:
        return 'The email address is already in use by another account.';
        break;
      case ERROR_CODE.OPERATION_NOT_ALLOWED:
        return 'Password sign-in is disabled for this project.';
      case ERROR_CODE.TOO_MANY_ATTEMPTS_TRY_LATER:
        return 'We have blocked all requests from this device due to unusual activity. Try again later.';
      case ERROR_CODE.EMAIL_NOT_FOUND:
        return 'There is no user record corresponding to this identifier. The user may have been deleted.';
      case ERROR_CODE.INVALID_PASSWORD:
        return 'The password is invalid or the user does not have a password.';
      case ERROR_CODE.USER_DISABLED:
        return 'The user account has been disabled by an administrator.';
      default:
        return 'An error occured';
    }
  }
}
