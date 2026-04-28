import { TournamentDescription, TournamentRules, useCurrentTournament } from '@entities/tournament';
import { Skeleton } from '@shared/ui';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { TournamentHero } from '@widgets/tournament-hero';
import { TournamentKeyDates } from '@widgets/tournament-key-dates';
import { TournamentOrganizers } from '@widgets/tournament-organizers';
import { TournamentStatsRow } from '@widgets/tournament-stats-row';
import { TournamentTeams } from '@widgets/tournament-teams';
import { TOURNAMENT_BG_CONFIG } from '../config/bgConfig';
import { useSyncTournamentId } from '../model/useSyncTournamentId';

import styles from './TournamentPage.module.css';

export function TournamentPage() {
  useSyncTournamentId();
  const { tournament, error } = useCurrentTournament();

  if (error) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <BGLayout bgConfig={TOURNAMENT_BG_CONFIG} className={styles.bgWrapper}>
          <main className={styles.mainContent}>
            <div className={styles.container}>
              <div className={styles.errorContainer}>
                <div className={styles.error}>{error || 'Турнір не знайдено'}</div>
              </div>
            </div>
          </main>
        </BGLayout>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <BGLayout bgConfig={TOURNAMENT_BG_CONFIG} className={styles.bgWrapper}>
        <main className={styles.mainContent}>
          <div className={styles.container}>
            <Skeleton.Provider>
              <TournamentHero />
              <TournamentStatsRow />
              <div className={styles.grid}>
                <div className={styles.leftCol}>
                  <TournamentDescription />
                  <TournamentRules id='tournament-rules' />
                </div>
                <div className={styles.rightCol}>
                  <TournamentKeyDates />
                  <TournamentTeams />
                  <TournamentOrganizers />
                </div>
              </div>
            </Skeleton.Provider>
          </div>
        </main>
      </BGLayout>
    </div>
  );
}
