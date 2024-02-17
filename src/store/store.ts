import { Middleware, configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './features/authSlice';
import userReducer, { User } from './features/userSlice';
import { charactersApi } from './features/charactersApi';

const customMiddleware: Middleware = () => next => action => {
  const res = next(action) as { type: string };
  switch (res.type) {
    case 'user/addToFavorites':
      console.log('hero added to favorites');
      break;
    case 'user/removeFromFavorites':
      console.log('hero removed from favorites');
      break;
    case 'user/addToHistory':
      console.log('search query is saved to history');
      break;
    case 'user/removeFromHistory':
      console.log('search query is removed from history');
      break;
  }

  return res;
};

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
    getDefaultMiddleware().concat([
      charactersApi.middleware,
      customMiddleware,
    ]),
});
