import { useGetCharactersQuery } from '../../store/features/charactersApi';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Character } from '../../types';
import { useSearchQuery } from '../header/search/hooks';
import { HeroesList, Loader } from './components/HeroesList';
export function Heroes() {
  const [offset, setOffset] = useState(0);
  const [heroes, setHeroes] = useState<Character[]>([]);
  const [searchQuery] = useSearchQuery();
  const limit = useMemo<number>(calculateLimit, [offset]);
  const heroesSectionRef = useRef<HTMLElement>(null);
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetCharactersQuery([searchQuery, limit, offset]);

  const handleScroll = () => {
    const { scrollHeight, clientHeight, scrollTop } =
      document.documentElement;
    if (!isSuccess) {
      return;
    }
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setOffset(prev => prev + data.length);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);

  useEffect(() => {
    setHeroes([]);
    setOffset(0);
  }, [searchQuery]);

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
    const itemsCnt = offset + data.length;
    if (heroes.length < itemsCnt) {
      setHeroes([...heroes, ...data]);
    }
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

const calculateLimit = () => {
  const cols = Math.trunc(
    (document.documentElement.clientWidth * 0.9) / 160,
  );
  const rows = Math.trunc(
    (document.documentElement.clientHeight * 0.9) / 180,
  );

  return cols * rows;
};
