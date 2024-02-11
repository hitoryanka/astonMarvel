import {
  ITEMS_LIMIT,
  useGetCharactersQuery,
} from '../../store/features/charactersApi';
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from '../../store/features/userSlice';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Character, FavoriteCharacter } from '../../types';

import favoriteActive from '../../assets/favorites-active.png';
import favorite from '../../assets/favorites.png';
import { useSearchQuery } from '../header/search/hooks';

type HeroesRef = {
  heroes: Character[];
  isLoader: boolean;
};
export function Heroes() {
  const [searchQuery] = useSearchQuery();
  const [page, setPage] = useState(0);
  const heroesRef = useRef<HeroesRef>({
    heroes: [],
    isLoader: false,
  }).current;
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetCharactersQuery([searchQuery, page]);

  const handleScroll = () => {
    const { scrollHeight, clientHeight, scrollTop } =
      document.documentElement;
    if (heroesRef.isLoader) {
      return;
    }
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    heroesRef.heroes = [];
  }, [searchQuery]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    heroesRef.isLoader = true;
    return <Loader />;
  }

  if (isFetching) {
    heroesRef.isLoader = true;
    return (
      <main>
        <HeroesList>{heroesRef.heroes}</HeroesList>
        <Loader />
      </main>
    );
  }

  if (isSuccess) {
    heroesRef.isLoader = false;
    const itemsCnt = (page + 1) * ITEMS_LIMIT;
    if (heroesRef.heroes.length < itemsCnt) {
      heroesRef.heroes.push(...data);
    }
    return (
      <main>
        <HeroesList>{heroesRef.heroes}</HeroesList>
      </main>
    );
  }

  if (isError) return <p>request failed</p>;
}

interface HeroesListProps {
  children: Character[];
}

function HeroesList({ children }: HeroesListProps) {
  const heroes = children.map(({ id, thumbnail, name }) => {
    const cover = `${thumbnail.path}/standard_xlarge.${thumbnail.extension}`;
    return <HeroCard key={id} id={id} cover={cover} name={name} />;
  });

  return <section className={s.heroes}>{heroes}</section>;
}

function Loader() {
  return <div>Loading...</div>;
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
        <FavoriteButton
          isFavorite={isFavorite}
          handleClick={toggleFavorite}
        />
      </div>
    </article>
  );
}

interface FavoriteButtonProps {
  isFavorite: boolean;
  handleClick: (e: SyntheticEvent) => void;
}

function FavoriteButton({
  isFavorite,
  handleClick,
}: FavoriteButtonProps) {
  return (
    <button className={s['favorite-check']} onClick={handleClick}>
      <img
        src={isFavorite ? favoriteActive : favorite}
        alt="click to save"
      />
    </button>
  );
}

function checkIsFavorite(id: number, favorites: FavoriteCharacter[]) {
  return Boolean(favorites.find(hero => hero.id === id));
}
