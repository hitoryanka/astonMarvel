import s from './styles.module.css';
import r, { useState } from 'react';
import { useDebounce, useSearchQuery } from './hooks';
import { SearchSuggest } from './SearchSuggest';

export function Search() {
  // TODO custom hook for setting search param
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 1500);
  const [, setSearchQuery] = useSearchQuery();

  const handleInputChange = ({
    target,
  }: r.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const handleKeyDown = ({ target, key }: r.KeyboardEvent) => {
    const input = target as HTMLInputElement;
    if (key === 'Enter') {
      setSearchQuery(search);
      return;
    }
    if (key === 'Escape') {
      input.blur();
    }
  };

  return (
    <div className={s['search-wrapper']}>
      <input
        className={s['search-input']}
        type="text"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Find your favorite hero!"
      />
      {debouncedValue !== '' && (
        <SearchSuggest query={debouncedValue} />
      )}
    </div>
  );
}
