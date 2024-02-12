import { forwardRef } from 'react';
import { Character } from '../../../types';
import s from '../styles.module.css';
import { HeroCard } from './HeroCard';

interface HeroesListProps {
  children: Character[];
}

export const HeroesList = forwardRef<HTMLElement, HeroesListProps>(
  function HeroesList({ children }, ref) {
    const heroes = children.map(({ id, thumbnail, name }) => {
      const cover = `${thumbnail.path}/standard_xlarge.${thumbnail.extension}`;
      return <HeroCard key={id} id={id} cover={cover} name={name} />;
    });

    return (
      <section ref={ref} className={s.heroes}>
        {heroes}
      </section>
    );
  },
);

export function Loader() {
  return <div>Loading...</div>;
}
