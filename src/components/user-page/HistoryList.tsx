import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromHistory,
  selectHistory,
} from '../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { SyntheticEvent } from 'react';
import s from './styles.module.css';
import historyPNG from '../../assets/history.png';
import historyRemovePNG from '../../assets/history-remove.png';

export default function HistoryList() {
  const history = useSelector(selectHistory);

  if (!history.length) {
    return <h2>You haven`t searched for anything yet</h2>;
  }

  return history.map(({ id, query }) => (
    <HistoryEntry key={id} id={id}>
      {query}
    </HistoryEntry>
  ));
}

interface HistoryEntryProps {
  children: string;
  id: number;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

function HistoryEntry({ children, id }: HistoryEntryProps) {
  const date = new Date(id).toLocaleString('en-gb', dateOptions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(removeFromHistory(id));
  };

  const handleNavigate = () => {
    navigate(`/heroes?search=${children}`);
  };

  return (
    <article className={s['history-entry']} onClick={handleNavigate}>
      <img
        className={s['history-clock']}
        src={historyPNG}
        alt="pretty-clock"
      />
      <h2 className={s['history-query']}>
        <span className={s['history-query-text']}>{children}</span>
      </h2>
      <time className={s['history-entry-date']}>{date}</time>
      <button className={s['remove-entry']} onClick={handleDelete}>
        <img
          className={s['remove-entry-icon']}
          src={historyRemovePNG}
          alt="remove-entry"
        />
      </button>
    </article>
  );
}
