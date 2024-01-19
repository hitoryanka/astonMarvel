import { AuthButtons } from './auth-buttons/AuthButtons';
import s from './styles.module.css';

export function Header() {
  return (
    <header className={s.header}>
      <a href="/heroes">heroes</a>
      <AuthButtons />
    </header>
  );
}
