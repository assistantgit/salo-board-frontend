import { useCurrentTournament } from '@entities/tournament';
import { JoinTournamentButton } from '@features/team-registration';
import {
  JuryAssessmentButton,
  TournamentDetailsButton,
  TournamentLeaderboardButton,
} from '@features/tournament-navigation';
import { ViewRulesButton } from '@features/tournament-rules';
import type React from 'react';
import { HeroHeader } from './components/HeroHeader';
import { HeroStats } from './components/HeroStats';
import styles from './TournamentHero.module.css';
import { TournamentHeroSkeleton } from './TournamentHeroSkeleton';

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
        <TournamentDetailsButton tournamentId={tournament.id} />
        <JuryAssessmentButton tournamentId={tournament.id} />
        <JoinTournamentButton tournamentId={tournament.id} status={tournament.status} />
        <TournamentLeaderboardButton tournamentId={tournament.id} status={tournament.status} />
        <ViewRulesButton />
      </div>
    </div>
  );
};
