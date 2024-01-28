import { useGetCharactersQuery } from '../../store/features/charactersApi';
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from '../../store/features/userSlice';
import { SyntheticEvent, useState } from 'react';
import { FavoriteCharacter } from '../../types';

import favoriteActive from '../../assets/favorites-active.png';
import favorite from '../../assets/favorites.png';

export function Heroes() {
  const { data, isLoading, isError, isSuccess } =
    useGetCharactersQuery();

  if (isLoading) return <p>loading..</p>;
  if (isError) return <p>request failed</p>;

  if (isSuccess) {
    const heroes = data.map(({ id, thumbnail, name }) => {
      const cover = `${thumbnail.path}/standard_xlarge.${thumbnail.extension}`;
      return <HeroCard key={id} id={id} cover={cover} name={name} />;
    });

    return <main className={s.heroes}>{heroes}</main>;
  }
  return <span>doing something else?</span>;
}

interface heroCardProps {
  id: number;
  cover: string;
  name: string;
}

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
      <img
        className={s['hero-thumbnail']}
        src={cover}
        alt={name + ' thumbnail'}
      />
      <div className={s['name-wrapper']}>
        <span className={s['name-wrapper-curtain']}></span>
        <h2 className={s['hero-name']}>{name}</h2>
        <button
          className={s['favorite-check']}
          onClick={toggleFavorite}
        >
          <img
            src={isFavorite ? favoriteActive : favorite}
            alt="click to save"
          />
        </button>
      </div>
    </article>
  );
}

function checkIsFavorite(id: number, favorites: FavoriteCharacter[]) {
  return Boolean(favorites.find(hero => hero.id === id));
}
