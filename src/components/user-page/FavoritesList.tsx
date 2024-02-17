import { useSelector } from 'react-redux';
import { selectFavorites } from '../../store/features/userSlice';
import { HeroCard } from '../heroes/components/HeroCard';

export default function FavoritesList() {
  // REFACTOR if the app is no longer about heroes start from here
  const favorites = useSelector(selectFavorites);

  if (!favorites.length) {
    return <h2>You don`t have favorite heroes yet</h2>;
  }

  const favoriteElements = favorites.map(({ id, cover, name }) => {
    return <HeroCard key={id} id={id} cover={cover} name={name} />;
  });

  return favoriteElements;
}
