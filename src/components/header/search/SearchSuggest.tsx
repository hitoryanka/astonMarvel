import { useGetCharacterByNameQuery } from '../../../store/features/charactersApi';
import { memo } from 'react';

interface Props {
  query: string;
}

export const SearchSuggest = memo(function SearchSuggest(p: Props) {
  const { query } = p;
  const { data, isSuccess, isError } =
    useGetCharacterByNameQuery(query);

  console.log(data);
  return <ul>Your search results will be here</ul>;
});
