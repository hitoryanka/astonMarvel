import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useSearchQuery() {
  const [searchParam, setSearchParam] = useSearchParams();

  const setSearchQuery = (newQuery: string) => {
    if (newQuery === '') {
      setSearchParam();
      return;
    }
    setSearchParam(`?search=${newQuery}`);
  };
  const searchQuery = searchParam.get('search') ?? '';

  // без "as" массиву присвоится union type:
  // "[string | (newQuery: string) => void]"
  return [searchQuery, setSearchQuery] as [
    string,
    (newQuery: string) => void,
  ];
}

export function useDebounce(value: string, delay: number) {
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
