import { NavLink } from 'react-router-dom';
import s from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  selectIsLogged,
} from '../../../store/features/authSlice';
import { ReactElement } from 'react';

export function AuthButtons() {
  const isLogged = useSelector(selectIsLogged);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  let content: ReactElement;

  if (isLogged) {
    content = (
      <div className={s.auth}>
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  } else {
    content = (
      <div className={s.auth}>
        <NavLink to="/auth/signin">signin</NavLink>
        <NavLink to="/auth/signup">signup</NavLink>
      </div>
    );
  }

  return content;
}
