import { useSyncTournamentId } from "../model/useSyncTournamentId";
import { Header } from "@widgets/header";
import { BGLayout } from "@widgets/bg-layout";
import { TOURNAMENT_BG_CONFIG } from "../config/bgConfig";
import { useCurrentTournament, TournamentDescription, TournamentRules } from "@entities/tournament";
import { TournamentHero, TournamentHeroSkeleton } from "@widgets/tournament-hero";
import { TournamentKeyDates, TournamentKeyDatesSkeleton } from "@widgets/tournament-key-dates";
import { TournamentOrganizers } from "@widgets/tournament-organizers";
import { TournamentTeams } from "@widgets/tournament-teams";
import { ContentBlock, Skeleton } from "@shared/ui";

import styles from "./TournamentPage.module.css";

export function TournamentPage() {
  useSyncTournamentId();
  const { tournament, isLoading, error } = useCurrentTournament();

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
            {isLoading ? (
              <Skeleton.Provider>
                <TournamentHeroSkeleton />
                <div className={styles.grid}>
                  <div className={styles.leftCol}>
                    <ContentBlock title="Про турнір">
                      <Skeleton.Text lines={4} lineHeight={20} gap={12} />
                    </ContentBlock>
                    <ContentBlock title="Правила турніру">
                      <Skeleton.Text lines={6} lineHeight={20} gap={12} />
                    </ContentBlock>
                  </div>
                  <div className={styles.rightCol}>
                    <TournamentKeyDatesSkeleton />
                  </div>
                </div>
              </Skeleton.Provider>
            ) : tournament ? (
              <>
                <TournamentHero />
                <div className={styles.grid}>
                  <div className={styles.leftCol}>
                    <TournamentDescription description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."} />
                    <TournamentRules id="tournament-rules" rules={"Lorem iLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.psum dolor sit amet consectetur adipisicing elit. Quisquam, quod."} />
                  </div>
                  <div className={styles.rightCol}>
                    <TournamentKeyDates />
                    <TournamentTeams />
                    <TournamentOrganizers />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </main>
      </BGLayout>
    </div>
  );
}