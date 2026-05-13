import { Link } from 'react-router-dom';
import styles from './TournamentCtaButton.module.css';

interface EditTournamentButtonProps {
  id: number;
}

export const EditTournamentButton = ({ id }: EditTournamentButtonProps) => {
  return (
    <Link
      to={`/admin/tournaments/${id}/edit`}
      className={`${styles.btn} ${styles.edit}`}
      style={{ background: 'var(--primary-color, #6560e0)', color: '#fff' }}
    >
      Редагувати
    </Link>
  );
};
