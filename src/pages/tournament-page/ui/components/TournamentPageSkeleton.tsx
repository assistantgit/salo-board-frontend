import { TournamentHeroSkeleton } from "@widgets/tournament-hero";
import { TournamentKeyDatesSkeleton } from "@widgets/tournament-key-dates";
import { ContentBlock, Skeleton } from "@shared/ui";
import styles from './TournamentPageColumns.module.css';

/**
 * TournamentPageSkeleton — Loading state for the tournament page.
 */
export function TournamentPageSkeleton() {
  return (
    <Skeleton.Provider>
      <TournamentHeroSkeleton />

      <div className={styles.bodyLayout}>
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
  );
}
