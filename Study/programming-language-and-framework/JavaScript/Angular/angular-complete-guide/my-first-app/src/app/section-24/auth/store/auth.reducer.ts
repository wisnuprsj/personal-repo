import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.Actions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const loginAction = <AuthActions.AuthenticateSuccess>action;
      const user = new User(
        loginAction.payload.email,
        loginAction.payload.userId,
        loginAction.payload.token,
        loginAction.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        loading: true,
        authError: null,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        authError: (<AuthActions.AuthenticateFail>action).payload,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
