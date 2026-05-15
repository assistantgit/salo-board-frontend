import { useMyTeamInTournament, useTeamsByTournament } from '@entities/team';
import { useActiveRound, useCurrentTournament } from '@entities/tournament';
import { formatDeadline } from '@shared/lib/date/formatDeadline';
import { GridIcon, PeopleIcon, PersonIcon, TimerIcon } from '@shared/ui/icons';
import { InfoCard } from '@shared/ui/info-card';
import type React from 'react';
import styles from './TournamentStatsRow.module.css';
import { TournamentStatsSkeleton } from './TournamentStatsSkeleton';

export const TournamentStatsRow: React.FC = () => {
  const { tournament, isLoading: isTournamentLoading } = useCurrentTournament();
  const { data: myTeam, isLoading: isTeamLoading } = useMyTeamInTournament(tournament?.id);
  const { data: activeRound, isLoading: isRoundLoading } = useActiveRound(tournament?.id);
  const { teams, isLoading: isAllTeamsLoading } = useTeamsByTournament(tournament?.id ?? null);

  const isLoading = isTournamentLoading || isTeamLoading || isRoundLoading || isAllTeamsLoading;

  if (isLoading) return <TournamentStatsSkeleton />;
  if (!tournament) return null;

  const isRegistered = !!myTeam;
  const isFinished = tournament.status === 'FN' || tournament.status === 'AR';

  const deadlineValue =
    tournament.status === 'RG'
      ? tournament.regCloseAt
      : tournament.status === 'RN'
        ? activeRound?.deadline
        : undefined;

  const showDaysLeft = isRegistered && !isFinished && Boolean(deadlineValue);

  const teamSize =
    tournament.minTeamSize === tournament.maxTeamSize
      ? `${tournament.maxTeamSize}`
      : `${tournament.minTeamSize}-${tournament.maxTeamSize}`;

  return (
    <div className={styles.row}>
      <InfoCard
        label='Команд'
        value={teams.length}
        icon={<PeopleIcon size={'2xl'} />}
        className={styles.card}
      />
      <InfoCard
        label='Макс. Команд'
        value={tournament.maxTeam ?? '—'}
        icon={<GridIcon size={'2xl'} />}
        className={styles.card}
      />
      <InfoCard
        label='учасників'
        value={teamSize}
        icon={<PersonIcon size={'2xl'} />}
        className={styles.card}
      />
      {showDaysLeft && (
        <InfoCard
          label='Дні залишилося'
          value={formatDeadline(deadlineValue)}
          icon={<TimerIcon size={'2xl'} />}
          variant='primary'
          className={styles.card}
        />
      )}
    </div>
  );
};
