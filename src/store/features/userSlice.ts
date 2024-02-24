import { createSlice } from '@reduxjs/toolkit';
import {
  authMatcher,
  getUser,
  updateUser,
  userMatcher,
} from './lib/userLib';
import { State } from '../store';
import { FavoriteCharacter } from '../../types';

export type User = {
  email: string;
  password: string;
  favorites: FavoriteCharacter[];
  history: { id: number; query: string }[];
};

const initialState = getUser();

export interface UpdateUserAction {
  payload: {
    email?: string;
    password?: string;
  };
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToFavorites(state, { payload }) {
      state.favorites.push(payload);
    },

    removeFromFavorites(state, { payload }) {
      state.favorites = state.favorites.filter(
        hero => hero.id !== payload,
      );
    },

    addToHistory(state, { payload }) {
      const newSearchEntry = {
        id: Date.now(),
        query: payload,
      };
      state.history.push(newSearchEntry);
    },

    removeFromHistory(state, { payload }) {
      state.history = state.history.filter(
        entry => entry.id !== payload,
      );
    },
  },
  extraReducers(builder) {
    builder.addMatcher(authMatcher, state => {
      const { email, password, favorites, history } = getUser();
      state.email = email;
      state.password = password;
      state.favorites = favorites;
      state.history = history;
    }),
      builder.addMatcher(userMatcher, state => {
        const favorites = JSON.stringify(state.favorites);
        const history = JSON.stringify(state.history);
        updateUser(favorites, history);
      });
  },
});

export const {
  addToFavorites,
  addToHistory,
  removeFromFavorites,
  removeFromHistory,
} = userSlice.actions;

export const selectUser = (state: State) => state.user;
export const selectFavorites = (state: State) => state.user.favorites;
export const selectHistory = (state: State) => state.user.history;
export default userSlice.reducer;
