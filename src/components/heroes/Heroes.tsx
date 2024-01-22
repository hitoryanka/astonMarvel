import { useGetCharactersQuery } from '../../store/features/charactersApi';

export function Heroes() {
  const { data } = useGetCharactersQuery();
  return <span>{data}</span>;
}
