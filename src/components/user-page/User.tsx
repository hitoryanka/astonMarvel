import s from './styles.module.css';
import {
  SetURLSearchParams,
  useSearchParams,
} from 'react-router-dom';
import { createContext } from 'react';
import { UserHeader } from './UserHeader';
import { UserContent } from './UserContent';

export const Params = createContext<
  [URLSearchParams, SetURLSearchParams] | null
>(null);

export function User() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <main className={s.main}>
      <Params.Provider value={[searchParams, setSearchParams]}>
        <UserHeader />
        <UserContent />
      </Params.Provider>
    </main>
  );
}
