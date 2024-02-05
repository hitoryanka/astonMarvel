import { NavLink } from 'react-router-dom';
import s from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  selectIsLogged,
} from '../../../store/features/authSlice';
import { ReactElement, useRef } from 'react';
import userPNG from '../../../assets/profile-user.png';

export function AuthButtons() {
  const isLogged = useSelector(selectIsLogged);

  let content: ReactElement;

  if (isLogged) {
    content = (
      <Profile />
      // <>
      //   <NavLink
      //     to={'/user'}
      //     title="your profile page"
      //     className={s['profile-pic-container']}
      //   >
      //     <img
      //       className={s['profile-pic']}
      //       src={userPNG}
      //       alt="your profile"
      //     />
      //   </NavLink>
      // </>
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

function Profile() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const ref = useRef<HTMLUListElement>(null);

  const handleShow = () => {
    console.log(ref.current);
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
      <ul ref={ref} className={s['drop-menu']}>
        <li className={s['drop-menu-item']}>
          <NavLink to="/user">My profile</NavLink>
        </li>
        <li className={s['drop-menu-item']} onClick={handleLogout}>
          Sign out
        </li>
      </ul>
    </div>
  );
}
