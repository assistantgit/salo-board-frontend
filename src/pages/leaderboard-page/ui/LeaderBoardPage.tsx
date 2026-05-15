import { NavigateBackButton } from '@features/navigate';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { TournamentLeaderboard } from '@widgets/tournament-leaderboard';
import { useNavigate, useParams } from 'react-router-dom';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './LeaderBoardPage.module.css';

export function LeaderboardPage() {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <BGLayout bgConfig={BG_LAYOUT_CONFIG} className={styles.bgWrapper}>
        <main className={styles.mainContent}>
          <div className={styles.container}>
            <div className={styles.topBar}>
              <NavigateBackButton
                label='Назад до турніру'
                className={styles.backLink}
                onBack={() => navigate(`/tournaments/${tournamentId}`)}
              />
            </div>
            <TournamentLeaderboard tournamentId={tournamentId} />
          </div>
        </main>
      </BGLayout>
    </div>
  );
}
