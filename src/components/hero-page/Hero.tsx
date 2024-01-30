import { useParams } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../../store/features/charactersApi';
import s from './styles.module.css';
import { SeriesList } from './SeriesList';

export function Hero() {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } =
    useGetCharacterByIdQuery(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  if (isSuccess) {
    // TODO create Hero component
    // [ ] choose data to display
    // [ ] style displayed data
    // [ ] add working links to outer resources (if any)
    // [ ] add logic
    console.log(data);
    const thumbnail = `${data.thumbnail.path}/standard_xlarge.${data.thumbnail.extension}`;
    return (
      <article className={s['hero-wrapper']}>
        <img
          className={s['hero-image']}
          src={thumbnail}
          alt={data.name}
        />
        <section className={s['hero-info']}>
          <h1 className={s['hero-name']}>{data.name}</h1>
          <p className={s['hero-description']}>{data.description}</p>
        </section>
        <section>
          <h2>Featured in</h2>
          <ul>
            <li>
              <SeriesList characterId={data.id} />
            </li>
            <li>Comics</li>
          </ul>
        </section>
      </article>
    );
  }
}
