import {
  ITEMS_LIMIT,
  useGetCharactersQuery,
} from '../../store/features/charactersApi';
import { useEffect, useRef, useState } from 'react';
import { Character } from '../../types';
import { useSearchQuery } from '../header/search/hooks';
import { HeroesList, Loader } from './components/HeroesList';

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
    return (
      <main>
        <Loader />
      </main>
    );
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
