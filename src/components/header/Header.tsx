import { useDispatch } from 'react-redux';
import { signin, signup } from '../../store/features/authSlice';

export function Header() {
  // REFACTOR move to auth pages
  const dispatch = useDispatch();
  const handleSignup = () => {
    const user = {
      email: `test${Math.random()}@mail.ru`,
      password: 'simple',
    };
    dispatch(signup(user));
  };

  const handleSignin = () => {
    const user = {
      email: 'dontExist@mail.com',
      password: 'hard',
    };

    dispatch(signin(user));
  };

  return (
    <header>
      <button onClick={handleSignin}>signin</button>
      <button onClick={handleSignup}>signup</button>
    </header>
  );
}
