import { useSearchParams } from 'react-router-dom';

export function useViewParam() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setView = (view: string) => {
    setSearchParams(`?view=${view}`);
  };
  const view = searchParams.get('view');

  return [view, setView] as [string, (view: string) => void];
}
