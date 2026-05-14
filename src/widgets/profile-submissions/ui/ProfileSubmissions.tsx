import { HistorySubmissionCard, useUserSubmissions } from '@entities/user';
import { ChevronRightIcon, NavButton, Skeleton } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSubmissions.module.css';

/**
 * ProfileSubmissions Widget.
 * Displays the last 3 submissions from the user.
 */
export const ProfileSubmissions = () => {
  const { submissions, isLoading } = useUserSubmissions();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <section className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Історія робіт</h2>
        </div>
        <Skeleton.Provider>
          <div className={styles.grid}>
            {[1, 2, 3].map((i) => (
              <Skeleton.Rect key={i} height={180} borderRadius={24} />
            ))}
          </div>
        </Skeleton.Provider>
      </section>
    );
  }

  if (submissions.length === 0) return null;

  const lastThree = submissions.slice(0, 3);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Історія робіт</h2>
        <NavButton
          onClick={() => navigate('/profile/history?tab=submissions')}
          className={styles.viewAllButton}
          icon={<ChevronRightIcon />}
          iconPosition='right'
        >
          Всі
        </NavButton>
      </div>

      <div className={styles.grid}>
        {lastThree.map((submission) => (
          <HistorySubmissionCard
            key={submission.id}
            submission={submission}
            onView={() => {
              const { tournamentId, tournament, round, roundId, status } = submission;
              const tId = tournamentId || tournament;
              const rId = roundId || round;
              if (tId && rId) {
                // If rated (Locked), go to round results, otherwise go to submission form
                const path =
                  status === 'LK'
                    ? `/tournaments/${tId}/tournamentDetails/${rId}`
                    : `/tournaments/${tId}/tournamentDetails/${rId}/submit`;
                navigate(path);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
};
