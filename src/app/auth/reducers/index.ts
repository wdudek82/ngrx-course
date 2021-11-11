import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { User } from '../model/user.model';
import { login, logout } from '../auth.actions';

export interface AuthState {
  user: User;
}

const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state, action) => {
    return {
      user: action.user,
    };
  }),
  on(logout, (_state, _action) => {
    return {
      user: undefined,
    };
  }),
);
