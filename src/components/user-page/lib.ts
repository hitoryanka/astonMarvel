import { useSearchParams } from 'react-router-dom';

export function useViewParam(): [string, (view: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const setView = (view: string) => {
    setSearchParams(`?view=${view}`);
  };
  const view = searchParams.get('view') ?? 'favorite';

  return [view, setView];
}
