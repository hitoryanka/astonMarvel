import { Link, useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { SyntheticEvent, useEffect, useState } from 'react';
import {
  selectError,
  selectIsLogged,
  signin,
} from '../../store/features/authSlice';

export function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector(selectError);
  const isLogged = useSelector(selectIsLogged);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/heroes');
    }
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleAuth = () => {
    dispatch(
      signin({
        email,
        password,
      }),
    );
  };

  return (
    <section className={s.wrapper}>
      <header>
        <h1 className={s.heading}>Login to your account</h1>
        <p className={s.error}>{error && `Error: ${error}`}</p>
      </header>
      <form action="" onSubmit={handleSubmit} className={s.form}>
        <div>
          <label className={s.label} htmlFor="email">
            Email
          </label>
          <input
            className={`${s.input} ${s.email}`}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            type="email"
            id="email"
            required
          />
        </div>
        <div>
          <label className={s.label} htmlFor="password">
            password
          </label>
          {/* TODO add button to view password for verification */}
          <input
            className={`${s.input} ${s.password}`}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            id="password"
            required
          />
        </div>
        <small className={s.caption}>
          don`t have an account yet? -{' '}
          <Link to="/auth/signup" className={s['caption-link']}>
            create one!
          </Link>
        </small>
        <button onClick={handleAuth} className={s.submit}>
          Join
        </button>
      </form>
    </section>
  );
}
