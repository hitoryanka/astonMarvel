import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useSearchQuery(): [
  string,
  (newQuery: string) => void,
] {
  const [searchParam, setSearchParam] = useSearchParams();

  const setSearchQuery = (newQuery: string) => {
    if (newQuery === '') {
      setSearchParam();
      return;
    }
    setSearchParam(`?search=${newQuery}`);
  };
  const searchQuery = searchParam.get('search') ?? '';

  return [searchQuery, setSearchQuery];
}

export function useDebounce(value: string, delay: number): string {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return searchQuery;
}
