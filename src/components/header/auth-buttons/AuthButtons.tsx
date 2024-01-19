import s from './styles.module.css';

export function AuthButtons() {
  return (
    <div className={s.auth}>
      <button>signin</button>
      <button>signup</button>
    </div>
  );
}
