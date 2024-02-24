import { useGetCharactersQuery } from '../../../store/features/charactersApi';
import { memo } from 'react';
import s from './styles.module.css';

interface Props {
  query: string;
}

export const SearchSuggest = memo(function SearchSuggest(p: Props) {
  const { query } = p;
  const { data, isSuccess, isError, isLoading } =
    useGetCharactersQuery([query, 25, 0]);

  if (isLoading) {
    return <ul className={s['suggestion-list']}>Loading...</ul>;
  }

  if (isError) {
    return (
      <ul className={s['suggestion-list']}>
        Please, try again later
      </ul>
    );
  }

  if (isSuccess) {
    const heroes = data
      .slice(0, 5)
      .map(({ id, name, thumbnail: { extension, path } }) => {
        const thumbnail = `${path}/standard_small.${extension}`;
        return (
          <Suggest
            key={id}
            thumbnail={thumbnail}
            name={name}
            id={id}
          />
        );
      });
    return <ul className={s['suggestion-list']}>{heroes}</ul>;
  }
});

interface SuggestProps {
  thumbnail: string;
  name: string;
  id: number;
}

function Suggest({ thumbnail, name, id }: SuggestProps) {
  return (
    <a href={`./heroes/${id}`} className={s['suggestion-item']}>
      <img
        src={thumbnail}
        className={s['hero-thumbnail']}
        alt="hero-portrait"
      />
      <p className={s['hero-name']}>{name}</p>
    </a>
  );
}
