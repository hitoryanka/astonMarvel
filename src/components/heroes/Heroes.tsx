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
  const heroesSectionRef = useRef<HTMLElement>(null);
  const heroesRef = useRef<HeroesRef>({
    heroes: [],
    isLoader: false,
  }).current;
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetCharactersQuery([searchQuery, page]);

  const handleScroll = () => {
    const heroesSection = heroesSectionRef.current as HTMLElement;
    const { height: heroesHeight } =
      window.getComputedStyle(heroesSection);
    console.log(heroesHeight);
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
      <main id="heroes-wrapper">
        <Loader />
      </main>
    );
  }
  if (isFetching) {
    heroesRef.isLoader = true;
    return (
      <main id="heroes-wrapper">
        <div id="margin-container-top"></div>
        <HeroesList ref={heroesSectionRef}>
          {heroesRef.heroes}
        </HeroesList>
        <div id="margin-container-bottom"></div>
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
      <main id="heroes-wrapper">
        <div id="margin-container-top"></div>
        <HeroesList ref={heroesSectionRef}>
          {heroesRef.heroes}
        </HeroesList>
        <div id="margin-container-bottom"></div>
      </main>
    );
  }
  if (isError) return <p>request failed</p>;
}
