import { User } from '../../../types';

export function getUser(): User {
  return {
    email: `${localStorage.getItem('email')}`,
    password: `${localStorage.getItem('password')}`,
    favorites: JSON.parse(localStorage.getItem('favorites') ?? '[]'),
    history: JSON.parse(localStorage.getItem('history') ?? '[]'),
  };
}

export function authMatcher(actionType: string) {
  return ['auth/signin', 'auth/signup'].includes(actionType);
}
