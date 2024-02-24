import { SyntheticEvent } from 'react';
import s from '../styles.module.css';
import favoriteActive from '../../../assets/favorites-active.png';
import favorite from '../../../assets/favorites.png';
import { useSelector } from 'react-redux';
import { selectIsLogged } from '../../../store/features/authSlice';

interface FavoriteButtonProps {
  isFavorite: boolean;
  handleClick: (e: SyntheticEvent) => void;
}

export function FavoriteButton({
  isFavorite,
  handleClick,
}: FavoriteButtonProps) {
  const isLogged = useSelector(selectIsLogged);

  if (!isLogged) {
    return <div className={s['favorite-fallback']}></div>;
  }

  return (
    <button className={s['favorite-check']} onClick={handleClick}>
      <img
        src={isFavorite ? favoriteActive : favorite}
        alt="click to save"
      />
    </button>
  );
}
