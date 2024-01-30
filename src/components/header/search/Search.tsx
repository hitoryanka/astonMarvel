import s from './styles.module.css';
import r, { useState } from 'react';
import { useDebounce, useSearchQuery } from './hooks';
import { SearchSuggest } from './SearchSuggest';
import { useDispatch } from 'react-redux';
import { addToHistory } from '../../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';

export function Search() {
  // TODO custom hook for setting search param
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 1000);
  const [, setSearchQuery] = useSearchQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = ({
    target,
  }: r.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const handleKeyDown = ({ target, key }: r.KeyboardEvent) => {
    // BUG doesn't navigate to heroes
    const input = target as HTMLInputElement;
    if (key === 'Enter') {
      navigate('/heroes');
      setSearchQuery(search);
      dispatch(addToHistory(search));
      input.blur();
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
