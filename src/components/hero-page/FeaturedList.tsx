import { useParams } from 'react-router-dom';
import { useGetCharacterFeaturedQuery } from '../../store/features/charactersApi';
import { useRef } from 'react';
import s from './styles.module.css';
import { Thumbnail } from '../../types';
import toggleFeaturedPNG from '../../assets/toggle-featured.png';

interface Props {
  type: 'comics' | 'series';
}
export function FeaturedList({ type }: Props) {
  // REFACTOR using refToggle rewrite refList to pure css
  const refList = useRef<HTMLUListElement>(null);
  const refToggle = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } =
    useGetCharacterFeaturedQuery([id as string, type]);

  const handleToggle = () => {
    if (!refList.current || !refToggle.current) {
      return;
    }
    refToggle.current.checked = !refToggle.current.checked;
    refList.current.classList.toggle(s.collapsed);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error!</div>;
  }
  if (isSuccess) {
    console.log(data);
    return (
      <section className={s['featured-wrapper']}>
        <header
          onClick={handleToggle}
          className={s['featured-list-header']}
        >
          <h2 className={s['featured-list-title']}>
            {type.toUpperCase()}
          </h2>
          <label
            htmlFor={s['toggle-list']}
            className="toggle-list-label"
          >
            <input
              ref={refToggle}
              type="checkbox"
              id={s['toggle-list']}
            />
            <img
              className={s['toggle-icon']}
              src={toggleFeaturedPNG}
              alt="toggle list icon"
            />
          </label>
        </header>
        <ul
          ref={refList}
          className={`${s['featured-list']} ${s['collapsed']}`}
        >
          {data.map(({ id, title, thumbnail }) => (
            <FeaturedItem
              key={id}
              title={title}
              thumbnail={thumbnail}
            />
          ))}
        </ul>
      </section>
    );
  }
}

interface FeaturedItemProps {
  title: string;
  thumbnail: Thumbnail;
}
function FeaturedItem(props: FeaturedItemProps) {
  const {
    title,
    thumbnail: { path, extension },
  } = props;
  const thumbnail = `${path}/portrait_xlarge.${extension}`;
  return (
    <li className={s['list-item']}>
      <img
        className={s['list-item-thumbnail']}
        src={thumbnail}
        alt={'cover image'}
      />
      <h3 className={s['list-item-title']}>{title}</h3>
    </li>
  );
}
