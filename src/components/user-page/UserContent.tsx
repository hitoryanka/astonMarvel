import { SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  removeFromHistory,
  selectFavorites,
  selectHistory,
} from '../../store/features/userSlice';
import { HeroCard } from '../heroes/Heroes';
import s from './styles.module.css';

export function UserContent() {
  // REFACTOR send as prop
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view');

  useEffect(() => {
    if (view !== 'favorites' && view !== 'history') {
      setSearchParams('?view=favorites');
    }
  }, [searchParams]);

  if (view === 'favorites') {
    return (
      <section className={s.favorites}>
        <FavoritesList />
      </section>
    );
  }

  return (
    <section className={s.history}>
      <HistoryList />
    </section>
  );
}

function HistoryList() {
  const history = useSelector(selectHistory);

  if (!history.length) {
    return <h2>You haven`t searched for anything yet</h2>;
  }

  return history.map(({ id, query }) => (
    <HistoryEntry key={id} id={id}>
      {query}
    </HistoryEntry>
  ));
}

function FavoritesList() {
  // REFACTOR if the app is no longer about heroes start from here
  const favorites = useSelector(selectFavorites);

  if (!favorites.length) {
    return <h2>You don`t have favorite heroes yet</h2>;
  }

  const favoriteElements = favorites.map(({ id, cover, name }) => {
    return <HeroCard key={id} id={id} cover={cover} name={name} />;
  });

  return favoriteElements;
}

interface HistoryEntryProps {
  children: string;
  id: number;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

function HistoryEntry({ children, id }: HistoryEntryProps) {
  const date = new Date(id).toLocaleString('en-gb', dateOptions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(removeFromHistory(id));
  };

  const handleNavigate = () => {
    navigate(`/heroes?search=${children}`);
  };

  return (
    <article className={s['history-entry']} onClick={handleNavigate}>
      <img
        className={s['history-clock']}
        src="src\assets\history.png"
        alt="pretty-clock"
      />
      <h2 className={s['history-query']}>
        <span className={s['history-query-text']}>{children}</span>
      </h2>
      <time className={s['history-entry-date']}>{date}</time>
      <button className={s['remove-entry']} onClick={handleDelete}>
        <img
          className={s['remove-entry-icon']}
          src="src\assets\history-remove.png"
          alt="remove-entry"
        />
      </button>
    </article>
  );
}
