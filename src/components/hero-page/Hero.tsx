import { NavLink, useParams } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../../store/features/charactersApi';
import s from './styles.module.css';
import { FeaturedList } from './FeaturedList';
import { Suspense } from 'react';

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
          <h1 className={s['hero-name']}>{data.name}</h1>
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
