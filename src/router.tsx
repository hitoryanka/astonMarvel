import { createBrowserRouter } from 'react-router-dom';
import { Heroes } from './components/heroes/Heroes';
import { Signup } from './components/auth/SIgnup';
import { Signin } from './components/auth/Signin';
import { Header } from './components/header/Header';
import { User } from './components/user-page/User';
import { Hero } from './components/hero-page/Hero';
import { NotFountPage } from './components/not-found-page/NotFountPage';

export const router = createBrowserRouter([
  { path: '/*', element: <NotFountPage /> },
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
    path: '/heroes/:id',
    element: (
      <>
        <Header />
        <Hero />
      </>
    ),
  },
  {
    path: '/user',
    element: (
      <>
        <Header />
        <User />
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
