import { FavoriteCharacter } from '../../../types';
import { User } from '../userSlice';
import { updateUsers } from './authLib';

export function getUser(): User {
  return {
    email: `${localStorage.getItem('email')}`,
    password: `${localStorage.getItem('password')}`,
    favorites: JSON.parse(localStorage.getItem('favorites') ?? '[]'),
    history: JSON.parse(localStorage.getItem('history') ?? '[]'),
  };
}

export function updateUser(favorites: string, history: string) {
  localStorage.setItem('favorites', favorites);
  localStorage.setItem('history', history);
  updateUsers(getUser());
}

type Action = {
  type: string;
  payload: {
    email: string;
    password: string;
  };
};

export function authMatcher({ type }: Action) {
  return ['auth/signin', 'auth/signup'].includes(type);
}

export function userMatcher({ type }: Action) {
  return [
    'user/addToFavorites',
    'user/addToHistory',
    'user/removeFromFavorites',
    'user/removeFromHistory',
  ].includes(type);
}
