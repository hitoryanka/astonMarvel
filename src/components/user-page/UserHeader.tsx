import { SyntheticEvent, useContext } from 'react';
import { Params } from './User';
import { SetURLSearchParams } from 'react-router-dom';
import s from './styles.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/userSlice';

export function UserHeader() {
  const { email } = useSelector(selectUser);

  return (
    <header className={s['user-header']}>
      <img src="src\assets\profile-user.png" alt="your picture" />
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
  const [params, setParams] = useContext(Params) as [
    URLSearchParams,
    SetURLSearchParams,
  ];

  const handleView = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setParams(`?view=${target.id}`);
  };

  return (
    <label className={s['display-button']} htmlFor={children}>
      {children}
      <input
        onClick={handleView}
        className={s['display-button-input']}
        type="radio"
        id={children}
        name="user-buttons"
        defaultChecked={params.get('view') === children}
      />
    </label>
  );
}
