import { NavLink } from 'react-router-dom';
import s from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  selectIsLogged,
} from '../../../store/features/authSlice';
import { ReactElement, forwardRef, useRef } from 'react';
import userPNG from '../../../assets/profile-user.png';

export function AuthButtons() {
  const isLogged = useSelector(selectIsLogged);

  let content: ReactElement;

  if (isLogged) {
    content = <Profile />;
  } else {
    content = (
      <div className={s['auth-buttons']}>
        <button className={s['auth-link-wrapper']}>
          <NavLink className={s['auth-link']} to="/auth/signup">
            sign up
          </NavLink>
        </button>
        <button className={s['auth-link-wrapper']}>
          <NavLink className={s['auth-link']} to="/auth/signin">
            sign in
          </NavLink>
        </button>
      </div>
    );
  }

  return <div className={s.auth}>{content}</div>;
}

function Profile() {
  const ref = useRef<HTMLUListElement>(null);

  const handleShow = () => {
    if (!ref.current) {
      return;
    }

    ref.current.classList.toggle(s.show);
  };

  return (
    <div onClick={handleShow} className={s['profile-wrapper']}>
      <img
        className={s['profile-pic']}
        src={userPNG}
        alt="your profile picture"
      />
      <ProfileDropMenu ref={ref} />
    </div>
  );
}

const ProfileDropMenu = forwardRef<HTMLUListElement>(
  function ProfileDropMenu(_, ref) {
    const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(logout());
    };
    return (
      <ul ref={ref} className={s['drop-menu']}>
        <li className={s['drop-menu-item']}>
          <NavLink to="/user">My profile</NavLink>
        </li>
        <li className={s['drop-menu-item']} onClick={handleLogout}>
          Sign out
        </li>
      </ul>
    );
  },
);
