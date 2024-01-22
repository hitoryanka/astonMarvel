import { createBrowserRouter } from 'react-router-dom';
import { Heroes } from './components/heroes/Heroes';
import { Signin } from './components/auth/Signin';
import { Signup } from './components/auth/SIgnup';
import { Header } from './components/header/Header';

export const router = createBrowserRouter([
  {
    path: '/heroes',
    element: (
      <>
        <Header />
        <Heroes />
      </>
    ),
  },
  {
    path: '/auth/signin',
    element: (
      <>
        <Header />
        <Signin />
      </>
    ),
  },
  {
    path: '/auth/signup',
    element: (
      <>
        <Header />
        <Signup />
      </>
    ),
  },
]);