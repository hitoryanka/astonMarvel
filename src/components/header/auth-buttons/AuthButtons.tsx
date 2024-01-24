import { NavLink } from 'react-router-dom';
import s from './styles.module.css';
import { useSelector } from 'react-redux';
import { selectIsLogged } from '../../../store/features/authSlice';
import { ReactElement } from 'react';

export function AuthButtons() {
  const isLogged = useSelector(selectIsLogged);

  let content: ReactElement;

  if (isLogged) {
    content = (
      <>
        <NavLink to={'/user'} className={s['profile-pic-container']}>
          <img
            className={s['profile-pic']}
            src="src\assets\profile-user.png"
            alt="your profile"
          />
        </NavLink>
      </>
    );
  } else {
    content = (
      <>
        <button className={s['auth-link-wrapper']}>
          <NavLink className={s['auth-link']} to="/auth/signup">
            signup
          </NavLink>
        </button>
        <button className={s['auth-link-wrapper']}>
          <NavLink className={s['auth-link']} to="/auth/signin">
            signin
          </NavLink>
        </button>
      </>
    );
  }

  return <div className={s.auth}>{content}</div>;
}
