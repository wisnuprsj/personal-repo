import { AuthResponseData, AuthService } from './../auth.service';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, of, tap } from 'rxjs';

import * as AuthActions from './auth.actions';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';

enum ERROR_CODE {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  USER_DISABLED = 'USER_DISABLED',
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An error occured';

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  switch (ERROR_CODE[errorRes.error.error.message]) {
    case ERROR_CODE.EMAIL_EXISTS:
      errorMessage = 'The email address is already in use by another account.';
      break;
    case ERROR_CODE.OPERATION_NOT_ALLOWED:
      errorMessage = 'Password sign-in is disabled for this project.';
      break;
    case ERROR_CODE.TOO_MANY_ATTEMPTS_TRY_LATER:
      errorMessage =
        'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
    case ERROR_CODE.EMAIL_NOT_FOUND:
      errorMessage =
        'There is no user record corresponding to this identifier. The user may have been deleted.';
      break;
    case ERROR_CODE.INVALID_PASSWORD:
      errorMessage =
        'The password is invalid or the user does not have a password.';
      break;
    case ERROR_CODE.USER_DISABLED:
      errorMessage = 'The user account has been disabled by an administrator.';
      break;
    default:
      errorMessage = 'An error occured';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          `${environment.FIREBASE_AUTH_URL}:signUp?key=${environment.FIREBASE_API_KEY}`,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authService.autoLogout(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return {
          type: 'DUMMY',
        };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        // this.autoLogout(expirationDuration);
        this.authService.autoLogout(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
        });
      }

      return {
        type: 'DUMMY',
      };
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          `${environment.FIREBASE_AUTH_URL}:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authService.autoLogout(+resData.expiresIn + 10);
          }),
          map((resData) => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
