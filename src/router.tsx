import { createBrowserRouter } from 'react-router-dom';
import { Heroes } from './components/heroes/Heroes';
import { AuthPage } from './components/auth/AuthPage';
import { Signin } from './components/auth/Signin';
import { Signup } from './components/auth/SIgnup';

export const router = createBrowserRouter([
  {
    path: '/heroes',
    element: <Heroes />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
    children: [
      {
        path: '/auth/signin',
        element: <Signin />,
      },
      {
        path: '/auth/signup',
        element: <Signup />,
      },
    ],
  },
]);
