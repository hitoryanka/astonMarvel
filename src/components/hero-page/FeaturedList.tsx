import { useParams } from 'react-router-dom';
import { useGetCharacterFeaturedQuery } from '../../store/features/charactersApi';
import { useRef } from 'react';
import s from './styles.module.css';
import { Featured } from '../../types';
import toggleFeaturedPNG from '../../assets/toggle-featured.png';
import PropTypes from 'prop-types';

interface Props {
  type: 'comics' | 'series';
}

FeaturedList.propTypes = {
  type: PropTypes.oneOf(['comics', 'series']),
};

export function FeaturedList({ type }: Props) {
  // REFACTOR using refToggle rewrite refList to pure css
  const refList = useRef<HTMLUListElement>(null);
  const refIcon = useRef<HTMLImageElement>(null);
  const { id } = useParams();
  // этот компонент работает только на странице,
  // в которой есть "id"
  const { data, isLoading, isError, isSuccess } =
    useGetCharacterFeaturedQuery([id as string, type]);

  const handleToggle = () => {
    if (!refList.current || !refIcon.current) {
      return;
    }
    refIcon.current.classList.toggle(s.expanded);
    refList.current.classList.toggle(s.collapsed);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error!</div>;
  }
  if (isSuccess) {
    return (
      <section className={s['featured-wrapper']}>
        <header
          title="toggle list"
          onClick={handleToggle}
          className={s['featured-list-header']}
        >
          <h2 className={s['featured-list-title']}>
            {type.toUpperCase()}
          </h2>
          <img
            className={s['toggle-icon']}
            ref={refIcon}
            src={toggleFeaturedPNG}
            alt="toggle list icon"
          />
        </header>
        <ul
          ref={refList}
          className={`${s['featured-list']} ${s['collapsed']}`}
        >
          {data.map(item => (
            <FeaturedItem key={item.id} {...item} />
          ))}
          {!data.length && (
            <p className={s['empty-list']}>Wow, such emptiness...</p>
          )}
        </ul>
      </section>
    );
  }
}

type FeaturedItemProps = Omit<Featured, 'description'>;
function FeaturedItem(props: FeaturedItemProps) {
  const {
    title,
    thumbnail: { path, extension },
    urls,
  } = props;
  const detailsURL = urls.find(url => url.type === 'detail')?.url;
  const thumbnail = `${path}/portrait_xlarge.${extension}`;
  return (
    <li className={s['list-item']}>
      <a href={detailsURL} target="_blank" rel="noopener noreferrer">
        <img
          className={s['list-item-thumbnail']}
          src={thumbnail}
          alt={'cover image'}
        />
        <h3 className={s['list-item-title']}>{title}</h3>
      </a>
    </li>
  );
}
