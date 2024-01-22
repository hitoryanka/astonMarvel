import { createSlice } from '@reduxjs/toolkit';
import { authMatcher, getUser } from './lib/userLib';

export type User = {
  email: string;
  password: string;
  favorites: string[];
  history: string[];
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
    updateUser(state, { payload }: UpdateUserAction) {
      state = {
        ...state,
        ...payload,
      };
      // TODO after updating user need to update users array
    },
  },
  extraReducers(builder) {
    builder.addMatcher(authMatcher, state => {
      const { email, password, favorites, history } = getUser();
      console.log('hello?');
      state.email = email;
      state.password = password;
      state.favorites = favorites;
      state.history = history;
    });
  },
});

export default userSlice.reducer;
