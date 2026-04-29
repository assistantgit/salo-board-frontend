import { TOURNAMENT_BG_CONFIG } from '@pages/tournament-page/config/bgConfig';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { TournamentLeaderboard } from '@widgets/tournament-leaderboard';
import { useParams } from 'react-router-dom';
import styles from './LeaderBoardPage.module.css';

export function LeaderboardPage() {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <BGLayout bgConfig={TOURNAMENT_BG_CONFIG} className={styles.bgWrapper}>
        <main className={styles.mainContent}>
          <div className={styles.container}>
            <TournamentLeaderboard tournamentId={tournamentId} />
          </div>
        </main>
      </BGLayout>
    </div>
  );
}
