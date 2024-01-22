import { User } from '../userSlice';

export function getUser(): User {
  return {
    email: `${localStorage.getItem('email')}`,
    password: `${localStorage.getItem('password')}`,
    favorites: JSON.parse(localStorage.getItem('favorites') ?? '[]'),
    history: JSON.parse(localStorage.getItem('history') ?? '[]'),
  };
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
