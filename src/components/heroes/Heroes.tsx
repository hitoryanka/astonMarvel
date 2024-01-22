import { ReactElement } from 'react';
import { useGetCharactersQuery } from '../../store/features/charactersApi';

export function Heroes() {
  const { data, isLoading, isError, isSuccess } =
    useGetCharactersQuery();
  let content: string | ReactElement[] = isLoading
    ? 'loading...'
    : 'updating...';

  if (isError) {
    content = 'request failed :(';
  }

  if (isSuccess) {
    content = data.map(res => {
      return (
        <article key={res.id}>
          <img
            src={`${res.thumbnail.path}.${res.thumbnail.extension}`}
            alt="thumbnail"
          />
          <h2>{res.name}</h2>
          <p>{res.description}</p>
        </article>
      );
    });
  }
  return <span>{content}</span>;
}
