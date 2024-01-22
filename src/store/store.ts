import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';
import { charactersApi } from './features/charactersApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});
