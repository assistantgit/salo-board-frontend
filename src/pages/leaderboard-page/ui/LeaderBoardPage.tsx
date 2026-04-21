import { useParams, Link } from 'react-router-dom';
import { Header } from '@widgets/header';
import { BGLayout } from '@widgets/bg-layout';
import { TournamentLeaderboard } from '@widgets/tournament-leaderboard';
import { TOURNAMENT_BG_CONFIG } from '@pages/tournament-page/config/bgConfig';
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