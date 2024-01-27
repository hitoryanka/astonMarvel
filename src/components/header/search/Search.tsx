import s from './styles.module.css';
import { SyntheticEvent, useState } from 'react';
import { useDebounce } from './hooks';
import { SearchSuggest } from './SearchSuggest';

export function Search() {
  // TODO custom hook for setting search param
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 1500);

  const handleInputChange = ({ target }: SyntheticEvent) => {
    const input = target as HTMLInputElement;
    setSearch(input.value);
  };

  return (
    <div className={s['search-wrapper']}>
      <input
        className={s['search-input']}
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder="Find your favorite hero!"
      />
      {debouncedValue !== '' && (
        <SearchSuggest query={debouncedValue} />
      )}
    </div>
  );
}
