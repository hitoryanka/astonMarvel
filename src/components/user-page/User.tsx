import s from './styles.module.css';
import { UserHeader } from './UserHeader';
import { UserContent } from './UserContent';

export function User() {
  return (
    <main className={s.main}>
      <UserHeader />
      <UserContent />
    </main>
  );
}
