import React from 'react';
import styles from './TournamentHero.module.css';
import { useCurrentTournament } from '@entities/tournament';
import { TournamentHeroSkeleton } from './TournamentHeroSkeleton';
import { HeroHeader } from './components/HeroHeader';
import { HeroStats } from './components/HeroStats';
import { JoinTournamentButton } from '@features/tournament-join';
import { ViewRulesButton } from '@features/tournament-rules';

export const TournamentHero: React.FC = () => {
  const { tournament, isLoading } = useCurrentTournament();

  if (isLoading) return <TournamentHeroSkeleton />;
  if (!tournament) return null;

  return (
    <div className={styles.heroContainer}>
      <HeroHeader status={tournament.status} title={tournament.title} />

      <div className={styles.divider} />

      <HeroStats
        startDate={tournament.startDate.toISOString()}
        regCloseAt={tournament.regCloseAt.toISOString()}
        minTeamSize={tournament.minTeamSize ?? 1}
        maxTeamSize={tournament.maxTeamSize ?? 5}
        maxTeam={tournament.maxTeam ?? 16}
      />

      <div className={styles.actions}>
        <JoinTournamentButton tournamentId={tournament.id} />
        <ViewRulesButton />
      </div>
    </div>
  )
}
