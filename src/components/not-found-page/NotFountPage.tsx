import { NavLink } from 'react-router-dom';
import s from './styles.module.css';

export function NotFountPage() {
  return (
    <>
      <h1>this page has nothing to offer (it`s empty)</h1>
      <NavLink className={s['to-home']} to={'/heroes'}>
        return to home page
      </NavLink>
    </>
  );
}
