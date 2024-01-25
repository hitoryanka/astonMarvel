import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
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
    <HistoryEntry key={id}>{query}</HistoryEntry>
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
}

function HistoryEntry({ children }: HistoryEntryProps) {
  return (
    <article>
      <img src="" alt="pretty-clock" />
      {/* TODO make link to /heroes?search={children} */}
      <h2>{children}</h2>
      <button>
        <img src="" alt="remove-entry" />
      </button>
    </article>
  );
}
