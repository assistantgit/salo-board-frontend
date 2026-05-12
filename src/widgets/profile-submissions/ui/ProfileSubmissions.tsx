import { HistorySubmissionCard, useUserSubmissions } from '@entities/user';
import { ChevronRightIcon, NavButton, Skeleton } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSubmissions.module.css';

// Mock data for testing
const MOCK_SUBMISSIONS = [
  {
    id: 1,
    tournamentTitle: 'Cyber Security Cup',
    roundTitle: 'Фінал',
    teamName: 'CyberGuardians',
    status: 'SB',
    submittedAt: '2024-04-01T14:30:00Z',
  },
  {
    id: 2,
    tournamentTitle: 'Data Science Hub',
    roundTitle: 'Раунд 2',
    teamName: 'InsightSeekers',
    status: 'DR',
    submittedAt: '2024-03-25T11:20:00Z',
  },
  {
    id: 3,
    tournamentTitle: 'Game Dev Jam',
    roundTitle: 'Відбірковий',
    teamName: 'PixelWizards',
    status: 'LK',
    submittedAt: '2024-03-10T18:45:00Z',
  },
];

/**
 * ProfileSubmissions Widget.
 * Displays the last 3 submissions from the user.
 */
export const ProfileSubmissions = () => {
  const { submissions: realSubmissions, isLoading } = useUserSubmissions();
  const navigate = useNavigate();

  // Use mock data if real submissions are empty (for testing)
  const submissions = realSubmissions.length > 0 ? realSubmissions : MOCK_SUBMISSIONS;

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
            submission={submission as any}
            onView={(id) => navigate(`/submissions/${id}`)}
          />
        ))}
      </div>
    </section>
  );
};
