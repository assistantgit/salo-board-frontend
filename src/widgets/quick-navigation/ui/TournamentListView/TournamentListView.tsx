import { useNavigate } from 'react-router-dom';
import { TournamentListRow } from '@entities/tournament';
import { TrophyIcon } from '@shared/ui/icons';
import type { TournamentDomain } from '@entities/tournament';
import styles from './TournamentListView.module.css';

interface TournamentListViewProps {
  tournaments: TournamentDomain[];
}

export const TournamentListView = ({ tournaments }: TournamentListViewProps) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.list} ${tournaments.length > 3 ? styles.scrollable : ''}`}>
      {tournaments.map((t) => (
        <TournamentListRow
          key={t.id}
          icon={TrophyIcon}
          title={`Турнір — ${t.title}`}
          teamsCount={t.teamsCount}
          onClick={() => navigate(`/tournaments/${t.id}`)}
        />
      ))}
    </div>
  );
};
