import { NavLink, useParams } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../../store/features/charactersApi';
import s from './styles.module.css';
import { FeaturedList } from './FeaturedList';
import { Suspense, SyntheticEvent, useState } from 'react';
import { FavoriteButton } from '../heroes/components/FavoriteButton';
import { useDispatch } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/features/userSlice';

export function Hero() {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } =
    useGetCharacterByIdQuery(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <>
        <h1>Seems like there`s no Hero with such id</h1>
        <NavLink className={s['error-link']} to="/heroes">
          Click here to go back to main page
        </NavLink>
      </>
    );
  }
  if (isSuccess) {
    const thumbnail = `${data.thumbnail.path}/standard_xlarge.${data.thumbnail.extension}`;
    return (
      <main className={s['hero-wrapper']}>
        <Suspense fallback={<div>DOWNLOADING IMAGE</div>}>
          <img
            className={s['hero-image']}
            src={thumbnail}
            alt={data.name}
          />
        </Suspense>
        <section className={s['hero-info']}>
          <HeroName id={data.id} cover={thumbnail} name={data.name} />
          <p className={s['hero-description']}>{data.description}</p>
        </section>
        <section className={s['featured']}>
          <h2>Featured in</h2>
          <div className={s['featured-lists-wrapper']}>
            <FeaturedList type="comics" />
            <FeaturedList type="series" />
          </div>
        </section>
      </main>
    );
  }
}

interface HeroNameProps {
  id: number;
  cover: string;
  name: string;
}

function HeroName({ name, id, cover }: HeroNameProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
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
    <div className={s['hero-name-wrapper']}>
      <h1 className={s['hero-name']}>{name}</h1>
      <FavoriteButton
        isFavorite={isFavorite}
        handleClick={toggleFavorite}
      />
    </div>
  );
}
