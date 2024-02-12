import {
  ITEMS_LIMIT,
  useGetCharactersQuery,
} from '../../store/features/charactersApi';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Character } from '../../types';
import { useSearchQuery } from '../header/search/hooks';
import { HeroesList, Loader } from './components/HeroesList';
export function Heroes() {
  const [searchQuery] = useSearchQuery();
  const [page, setPage] = useState(0);
  const heroesSectionRef = useRef<HTMLElement>(null);
  const [heroes, setHeroes] = useState<Character[]>([]);
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetCharactersQuery([searchQuery, page]);

  const handleScroll = () => {
    const heroesSection = heroesSectionRef.current as HTMLElement;
    const { height: heroesHeight } =
      window.getComputedStyle(heroesSection);
    console.log(heroesHeight);
    const { scrollHeight, clientHeight, scrollTop } =
      document.documentElement;
    if (isLoading) {
      return;
    }
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setPage(prev => prev + 1);
    }
  };

  useLayoutEffect(() => {
    console.log('clearing heroes');
    setHeroes([]);
  }, [searchQuery]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [data]);

  // useEffect(() => {
  //   if (data?.length === 0) {
  //     console.log(data);
  //     console.log('data is empty');
  //     document.removeEventListener('scroll', handleScroll);
  //   }
  // }, [data]);

  if (isLoading) {
    return (
      <main id="heroes-wrapper">
        <Loader />
      </main>
    );
  }
  if (isFetching) {
    return (
      <main id="heroes-wrapper">
        <div id="margin-container-top"></div>
        <HeroesList ref={heroesSectionRef}>{heroes}</HeroesList>
        <div id="margin-container-bottom"></div>
        <Loader />
      </main>
    );
  }
  if (isSuccess) {
    const itemsCnt = (page + 1) * ITEMS_LIMIT;
    if (heroes.length < itemsCnt) {
      heroes.push(...data);
    }
    console.log('Im successful: ', heroes);
    return (
      <main id="heroes-wrapper">
        <div id="margin-container-top"></div>
        <HeroesList ref={heroesSectionRef}>{heroes}</HeroesList>
        <div id="margin-container-bottom"></div>
      </main>
    );
  }
  if (isError) return <p>request failed</p>;
}

// TODO when empty array is returned from useGetCharactersQuery, remove the scroll handler
