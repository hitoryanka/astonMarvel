import { User } from '../userSlice';

export function getUsers(): User[] {
  const users: User[] | null = JSON.parse(
    localStorage.getItem('users') ?? 'null',
  );

  if (users === null) {
    localStorage.setItem('users', '[]');
    return [];
  }

  return users;
}

export function updateUsers(updatedUser: User): void {
  const users = getUsers().filter(
    user => user.email !== updatedUser.email,
  );
  users.push(updatedUser);

  localStorage.setItem('users', JSON.stringify(users));
}

export function addUser(newUser: User): void {
  const users = getUsers();
  users.push(newUser);

  localStorage.setItem('users', JSON.stringify(users));
}

export function findUser(email: string): User | undefined {
  const users = getUsers();

  return users.find(user => user.email === email);
}

// returns error status
export function authorizeExisting(
  email: string,
  password: string,
): 'Invalid credentials' | null {
  const user = findUser(email);

  if (!user || user.password !== password) {
    return 'Invalid credentials';
  }

  localStorage.setItem('email', user.email);
  localStorage.setItem('password', user.password);
  localStorage.setItem('favorites', JSON.stringify(user.favorites));
  localStorage.setItem('history', JSON.stringify(user.history));
  localStorage.setItem('isLogged', 'true');

  return null;
}

export function authorizeNew(
  email: string,
  password: string,
): 'User with this email already exists' | null {
  const user = findUser(email);

  if (user) {
    return 'User with this email already exists';
  }

  const newUser: User = {
    email,
    password,
    favorites: [],
    history: [],
  };

  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
  localStorage.setItem('favorites', '[]');
  localStorage.setItem('history', '[]');
  localStorage.setItem('isLogged', 'true');

  updateUsers(newUser);

  return null;
}

export function logoutUser(): void {
  localStorage.removeItem('email');
  localStorage.removeItem('password');
  localStorage.removeItem('history');
  localStorage.removeItem('favorites');
  localStorage.setItem('isLogged', 'false');
}
