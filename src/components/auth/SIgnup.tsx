import { Link, useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectIsLogged,
  signup,
} from '../../store/features/authSlice';

// TODO merge singup and signin - thinking props
export function Signup() {
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
      signup({
        email,
        password,
      }),
    );
  };
  return (
    <section className={s.wrapper}>
      <header className={s.header}>
        <h1>Create new account</h1>
        <p className={s.error}>{error && `Error: ${error}`}</p>
      </header>
      <form className={s.form} onSubmit={handleSubmit} action="">
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
          already have an account? -{' '}
          <Link to="/auth/signin">login!</Link>
        </small>
        <button onClick={handleAuth} className={s.submit}>
          Submit
        </button>
      </form>
    </section>
  );
}
