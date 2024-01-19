import { NavLink } from 'react-router-dom';
import s from './styles.module.css';

export function AuthButtons() {
  return (
    <div className={s.auth}>
      <NavLink to="/auth/signin">signin</NavLink>
      <NavLink to="/auth/signup">signup</NavLink>
    </div>
  );
}
