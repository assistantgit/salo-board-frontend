import { HistoryTournamentCard, type UserTournamentDto, useUserTournaments } from '@entities/user';
import { ChevronRightIcon, NavButton, Skeleton } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileHistory.module.css';

/**
 * ProfileHistory Widget.
 * Displays the last 3 tournaments the user participated in.
 */
export const ProfileHistory = () => {
  const { tournaments, isLoading } = useUserTournaments();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <section className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Історія участі</h2>
        </div>
        <Skeleton.Provider>
          <div className={styles.grid}>
            {[1, 2, 3].map((i) => (
              <Skeleton.Rect key={i} height={280} borderRadius={24} />
            ))}
          </div>
        </Skeleton.Provider>
      </section>
    );
  }

  // 1. Якщо юзер не брав учать віджет не відображати
  if (tournaments.length === 0) return null;

  const lastThree = tournaments.slice(0, 3);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Історія участі</h2>
        <NavButton
          onClick={() => navigate('/profile/history')}
          className={styles.viewAllButton}
          icon={<ChevronRightIcon />}
          iconPosition='right'
        >
          Всі
        </NavButton>
      </div>

      <div className={styles.grid}>
        {lastThree.map((tournament) => (
          <HistoryTournamentCard
            key={tournament.id}
            tournament={tournament}
            onView={(id) => navigate(`/tournaments/${id}`)}
          />
        ))}
      </div>
    </section>
  );
};
