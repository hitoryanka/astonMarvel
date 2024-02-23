import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from '../../../store/features/userSlice';
import { SyntheticEvent, useState } from 'react';
import s from '../styles.module.css';
import { FavoriteCharacter } from '../../../types';
import { FavoriteButton } from './FavoriteButton';
import PropTypes from 'prop-types';
import HeroThumbnail from './HeroThumbnail';

interface heroCardProps {
  id: number;
  cover: string;
  name: string;
}

HeroCard.propTypes = {
  id: PropTypes.number,
  cover: PropTypes.string,
  name: PropTypes.string,
};

export function HeroCard(props: heroCardProps) {
  const { id, cover, name } = props;
  const navigate = useNavigate();
  const favorites = useSelector(selectFavorites);
  const [isFavorite, setIsFavorite] = useState(
    checkIsFavorite(id, favorites),
  );
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigate(`/heroes/${id}`);
  };

  const toggleFavorite = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsFavorite(prev => !prev);
    if (!isFavorite) {
      dispatch(addToFavorites({ id, cover, name }));
      return;
    }

    dispatch(removeFromFavorites(id));
  };

  return (
    <article className={s['hero-container']} onClick={handleNavigate}>
      <HeroThumbnail src={cover} alt={name + '-thumbnail'} />
      <div className={s['name-wrapper']}>
        <span className={s['name-wrapper-curtain']}></span>
        <h2 className={s['hero-name']}>{name}</h2>
        <FavoriteButton
          isFavorite={isFavorite}
          handleClick={toggleFavorite}
        />
      </div>
    </article>
  );
}

function checkIsFavorite(id: number, favorites: FavoriteCharacter[]) {
  return Boolean(favorites.find(hero => hero.id === id));
}
