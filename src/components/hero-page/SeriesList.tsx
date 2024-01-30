import { useGetCharacterSeriesQuery } from '../../store/features/charactersApi';
import { Series } from '../../types';

interface Props {
  characterId: number;
}

export function SeriesList({ characterId }: Props) {
  const { data, isLoading, isError, isSuccess } =
    useGetCharacterSeriesQuery(characterId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error!</div>;
  }
  if (isSuccess) {
    return (
      <ol>
        {data.map(({ id, title, thumbnail }) => (
          <SeriesItem key={id} title={title} thumbnail={thumbnail} />
        ))}
      </ol>
    );
  }
}

type SeriesItemProps = Omit<Series, 'description' | 'id'>;

function SeriesItem(props: SeriesItemProps) {
  const {
    title,
    thumbnail: { path, extension },
  } = props;
  const thumbnail = `${path}/portrait_large.${extension}`;
  return (
    <article>
      <img src={thumbnail} alt={'cover image'} />
      <h3>{title}</h3>
    </article>
  );
}
