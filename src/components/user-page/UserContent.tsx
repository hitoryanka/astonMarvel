import { Suspense, lazy, useEffect } from 'react';
import { useViewParam } from './lib';
import s from './styles.module.css';

const HistoryList = lazy(() => import('./HistoryList'));
const FavoritesList = lazy(() => import('./FavoritesList'));

export function UserContent() {
  // REFACTOR send as prop
  const [view, setView] = useViewParam();

  useEffect(() => {
    if (view !== 'favorites' && view !== 'history') {
      setView('favorites');
    }
  }, [view]);

  if (view === 'favorites') {
    return (
      <section className={s.favorites}>
        <Suspense fallback={<div>Loading...</div>}>
          <FavoritesList />
        </Suspense>
      </section>
    );
  }

  return (
    <section className={s.history}>
      <Suspense fallback={<div>Loading...</div>}>
        <HistoryList />
      </Suspense>
    </section>
  );
}
