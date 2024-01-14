import { User } from '../../../types';

export function getUsers() {
  const users: User[] | null = JSON.parse(
    localStorage.getItem('users') ?? 'null',
  );

  if (users === null) {
    localStorage.setItem('users', '[]');
    return [];
  }

  return users;
}

export function addUser(newUser: User) {
  const users = getUsers();
  users.push(newUser);

  localStorage.setItem('users', JSON.stringify(users));
}

export function findUser(email: string) {
  const users = getUsers();

  return users.find(user => user.email === email);
}

// returns error status
export function authorizeExisting(email: string, password: string) {
  const user = findUser(email);

  if (!user || user.password !== password) {
    return new Error('Invalid credentials');
  }

  localStorage.setItem('email', user.email);
  localStorage.setItem('password', user.password);
  localStorage.setItem('favorites', JSON.stringify(user.favorites));
  localStorage.setItem('history', JSON.stringify(user.history));

  localStorage.setItem('isLogged', 'true');

  return null;
}
