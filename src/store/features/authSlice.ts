import { createSlice } from '@reduxjs/toolkit';
import { authorizeExisting, getUsers } from './lib/authLib';
import { User } from '../../types';

type initialStateType = {
  isLogged: boolean;
  isError: null | Error;
  users: User[];
};

const initialState: initialStateType = {
  isLogged: Boolean(localStorage.getItem('isLogged') === 'true'),
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

      if (isError) {
        return;
      }

      state.isLogged = true;
      // TODO update user in extra reducer
    },
  },
});

export type authState = typeof initialState;

export const getIsLogged = (state: authState) => state.isLogged;

export default authSlice.reducer;
export const { signin } = authSlice.actions;