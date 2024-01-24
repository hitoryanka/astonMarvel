import { useGetCharactersQuery } from '../../store/features/charactersApi';
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';

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
// BUG I can't use description field since most of them are empty, and others are in HTML format
// TODO provide list of ids to fetch popular heroes

// TODO use nameStartsWith / titleStartsWith param for Search UI
// TODO use modifiedSince param / orderBy=-modified
// to get rid of old characters (must not affect search)

// TODO paginate with limit and offset
// TODO look for a way to add query params to RTK baseQuery

interface heroCardProps {
  id: number;
  cover: string;
  name: string;
}

function HeroCard(props: heroCardProps) {
  const { id, cover, name } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/heroes/${id}`);
  };

  return (
    <article className={s['hero-container']} onClick={handleClick}>
      <img
        className={s['hero-thumbnail']}
        src={cover}
        alt={name + ' thumbnail'}
      />
      <div className={s['name-wrapper']}>
        <div className={s['name-wrapper-curtain']}></div>
        <h2 className={s['hero-name']}>{name}</h2>
      </div>
    </article>
  );
}
