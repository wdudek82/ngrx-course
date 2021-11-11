import { createAction, props } from '@ngrx/store';
import { User } from './model/user.model';

export enum AuthActionTypes {
  Login = '[Login Page] User Login Action',
  Logout = '[Top Menu] Logout Action',
}

export const login = createAction(
  AuthActionTypes.Login,
  props<{ user: User }>(),
);

export const logout = createAction(
  AuthActionTypes.Logout,
);

export const AuthActions = [login, logout];
