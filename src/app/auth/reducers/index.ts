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
import { AuthActions } from '../action-types';

export interface AuthState {
  user: User;
}

const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    console.log('Calling login reducer.');
    return {
      user: action.user,
    };
  }),
  on(AuthActions.logout, (_state, _action) => {
    return {
      user: undefined,
    };
  }),
);
