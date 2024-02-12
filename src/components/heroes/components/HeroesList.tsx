import { Character } from '../../../types';
import s from '../styles.module.css';
import { HeroCard } from './HeroCard';

interface HeroesListProps {
  children: Character[];
}

export function HeroesList({ children }: HeroesListProps) {
  const heroes = children.map(({ id, thumbnail, name }) => {
    const cover = `${thumbnail.path}/standard_xlarge.${thumbnail.extension}`;
    return <HeroCard key={id} id={id} cover={cover} name={name} />;
  });

  return <section className={s.heroes}>{heroes}</section>;
}

export function Loader() {
  return <div>Loading...</div>;
}
