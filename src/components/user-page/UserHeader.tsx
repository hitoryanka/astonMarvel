import { SyntheticEvent } from 'react';
import s from './styles.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/userSlice';
import userPNG from '../../assets/profile-user.png';
import { useViewParam } from './lib';

export function UserHeader() {
  const { email } = useSelector(selectUser);

  return (
    <header className={s['user-header']}>
      <img src={userPNG} alt="your picture" />
      <h1 className={s['user-email']}>{email}</h1>
      <div className={s['display-buttons']}>
        <ViewButton>favorites</ViewButton>
        <ViewButton>history</ViewButton>
      </div>
    </header>
  );
}

interface ViewButtonProps {
  children: string;
}

export function ViewButton({ children }: ViewButtonProps) {
  const [view, setView] = useViewParam();
  const handleView = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setView(target.id);
  };

  return (
    <>
      <input
        onClick={handleView}
        className={s['display-button-input']}
        type="radio"
        id={children}
        name="user-buttons"
        checked={view === children}
      />
      <label className={s['display-button']} htmlFor={children}>
        {children}
      </label>
    </>
  );
}
