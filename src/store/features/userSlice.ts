import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: `${localStorage.getItem('email')}`,
  password: `${localStorage.getItem('password')}`,
  favorites: `${localStorage.getItem('favorites')}`,
  history: `${localStorage.getItem('history')}`,
};

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
});

export default userSlice.reducer;
