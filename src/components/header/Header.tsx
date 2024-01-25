import { AuthButtons } from './auth-buttons/AuthButtons';
import s from './styles.module.css';

export function Header() {
  return (
    <header className={s.header}>
      <Logo />
      <Search />
      <AuthButtons />
    </header>
  );
}

function Logo() {
  return (
    <a className={s.logo} href="/heroes">
      MARVEL HEROES
    </a>
  );
}

function Search() {
  return <input className={s['search-input']} type="text" />;
}
