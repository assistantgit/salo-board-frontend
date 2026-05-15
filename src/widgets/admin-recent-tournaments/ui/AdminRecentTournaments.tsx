import { TournamentListBase, useTournaments } from '@entities/tournament';
import { EditTournamentButton } from '@features/tournament-navigation';
import { ChevronRightIcon, NavButton } from '@shared/ui';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminRecentTournaments.module.css';

/**
 * AdminRecentTournaments Widget.
 * Displays the last 4 non-archived tournaments for admins.
 */
export const AdminRecentTournaments: React.FC = () => {
  const navigate = useNavigate();
  const { tournaments, isLoading, error } = useTournaments({
    role: 'admin',
    isArchive: false,
  });

  const recentTournaments = tournaments.slice(0, 4);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Останні турніри</h2>
        <NavButton
          onClick={() => navigate('/admin/tournaments')}
          className={styles.viewAllButton}
          icon={<ChevronRightIcon />}
          iconPosition='right'
        >
          Всі
        </NavButton>
      </div>

      <TournamentListBase
        tournaments={recentTournaments}
        isLoading={isLoading}
        error={error}
        renderCta={(t) => <EditTournamentButton id={t.id} />}
        emptyMessage='У вас поки немає створених турнірів'
        className={styles.list}
      />
    </section>
  );
};
