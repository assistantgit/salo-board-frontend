import { HistoryTournamentCard, useUserTournaments } from '@entities/user';
import { ChevronRightIcon, NavButton, Skeleton } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileHistory.module.css';

// Mock data for testing
const MOCK_TOURNAMENTS = [
  {
    id: 1,
    title: 'Весняний Хакатон 2024',
    status: 'FN',
    startDate: '2024-03-15T10:00:00Z',
    endedAt: '2024-03-17T18:00:00Z',
  },
  {
    id: 2,
    title: 'Code Battle: Round 12',
    status: 'FN',
    startDate: '2024-02-10T12:00:00Z',
    endedAt: '2024-02-10T20:00:00Z',
  },
  {
    id: 3,
    title: 'AI Challenge: Vision',
    status: 'FN',
    startDate: '2024-01-20T09:00:00Z',
    endedAt: '2024-01-21T18:00:00Z',
  },
];

/**
 * ProfileHistory Widget.
 * Displays the last 3 tournaments the user participated in.
 */
export const ProfileHistory = () => {
  const { tournaments: realTournaments, isLoading } = useUserTournaments();
  const navigate = useNavigate();

  // Use mock data if real tournaments are empty (for testing) or just use real ones
  const tournaments = realTournaments.length > 0 ? realTournaments : MOCK_TOURNAMENTS;

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
            tournament={tournament as any}
            onView={(id) => navigate(`/tournaments/${id}`)}
          />
        ))}
      </div>
    </section>
  );
};
