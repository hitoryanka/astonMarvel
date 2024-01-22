import { createSlice } from '@reduxjs/toolkit';
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
  isError: null | string;
  users: User[];
};

const initialState: initialStateType = {
  isLogged: localStorage.getItem('isLogged') === 'true',
  isError: null,
  users: getUsers(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin(state, { payload }) {
      const isError = authorizeExisting(
        payload.email,
        payload.password,
      );

      state.isError = isError;
      if (isError) return;

      state.isLogged = true;
    },

    signup(state, { payload }) {
      const isError = authorizeNew(payload.email, payload.password);
      state.isError = isError;

      if (isError) return;

      state.isLogged = true;
    },

    // every time user is updated it is synced "users", so I need just clear it from localStorage
    logout(state) {
      state.isError = null;
      state.isLogged = false;
      logoutUser();
    },
  },
});

export type AuthState = typeof initialState;

export const selectIsLogged = (state: State) => state.auth.isLogged;

export default authSlice.reducer;
export const { signin, signup, logout } = authSlice.actions;
