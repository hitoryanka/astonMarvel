import { useGetCharactersQuery } from '../../store/features/charactersApi';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchQuery } from '../header/search/hooks';
import { HeroesList, Loader } from './components/HeroesList';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../ErrorFallback';

export function Heroes() {
  const [, setChangeOffset] = useState(0);
  const offsetRef = useRef(0);
  const [searchQuery] = useSearchQuery();
  const limit = useMemo<number>(calculateLimit, [offsetRef.current]);
  const heroesSectionRef = useRef<HTMLElement>(null);

  useMemo(() => {
    offsetRef.current = 0;
  }, [searchQuery]);

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetCharactersQuery([searchQuery, limit, offsetRef.current]);

  const handleScroll = () => {
    const { scrollHeight, clientHeight, scrollTop } =
      document.documentElement;

    if (!isSuccess || data.length === 0) {
      return;
    }
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      offsetRef.current = data.length;
      setChangeOffset(prev => ++prev);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);

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
        <HeroesList ref={heroesSectionRef}>{data}</HeroesList>
        <Loader />
      </main>
    );
  }
  if (isSuccess) {
    return (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <main id="heroes-wrapper">
          <HeroesList ref={heroesSectionRef}>{data}</HeroesList>
        </main>
      </ErrorBoundary>
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
