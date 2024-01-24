import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './features/authSlice';
import userReducer, { User } from './features/userSlice';
import { charactersApi } from './features/charactersApi';

export type State = {
  auth: AuthState;
  user: User;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});
