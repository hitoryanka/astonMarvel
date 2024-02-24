import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  authorizeExisting,
  authorizeNew,
  getUsers,
  logoutUser,
} from './lib/authLib';
import { User } from './userSlice';
import { State } from '../store';

type initialStateType = {
  isLogged: boolean;
  error: null | string;
  users: User[];
};

const initialState: initialStateType = {
  isLogged: localStorage.getItem('isLogged') === 'true',
  error: null,
  users: getUsers(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin(state, { payload }) {
      const error = authorizeExisting(
        payload.email,
        payload.password,
      );

      state.error = error;
      if (error) return;

      state.isLogged = true;
    },

    signup(state, { payload }) {
      const error = authorizeNew(payload.email, payload.password);
      state.error = error;

      if (error) return;

      state.isLogged = true;
    },

    logout(state) {
      state.error = null;
      state.isLogged = false;
      logoutUser();
    },
  },
});

export type AuthState = typeof initialState;

export const selectIsLogged = createSelector(
  (state: State) => state.auth.isLogged,
  isLogged => isLogged,
);
export const selectError = (state: State) => state.auth.error;

export default authSlice.reducer;
export const { signin, signup, logout } = authSlice.actions;
