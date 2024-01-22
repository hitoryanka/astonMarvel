import { Link } from 'react-router-dom';
import s from './styles.module.css';
import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/features/authSlice';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

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
      <h1>Create new account</h1>
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
