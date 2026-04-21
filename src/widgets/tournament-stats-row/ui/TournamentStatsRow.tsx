import React from 'react';
import { useCurrentTournament, useActiveRound } from '@entities/tournament';
import { useMyTeamInTournament } from '@entities/team';
import { InfoCard } from '@shared/ui/info-card';
import { PeopleIcon, GridIcon, PersonIcon, TimerIcon } from '@shared/ui/icons';
import { formatDeadline } from '@shared/lib/date/formatDeadline';
import { TournamentStatsSkeleton } from './TournamentStatsSkeleton';
import styles from './TournamentStatsRow.module.css';

export const TournamentStatsRow: React.FC = () => {
    const { tournament, isLoading: isTournamentLoading } = useCurrentTournament();
    const { data: myTeam, isLoading: isTeamLoading } = useMyTeamInTournament(tournament?.id);
    const { data: activeRound, isLoading: isRoundLoading } = useActiveRound(tournament?.id);

    const isLoading = isTournamentLoading || isTeamLoading || isRoundLoading;

    if (isLoading) return <TournamentStatsSkeleton />;
    if (!tournament) return null;

    const isRegistered = !!myTeam;
    const isFinished = tournament.status === 'FN' || tournament.status === 'AR';

    const deadlineValue = tournament.status === 'RG'
        ? tournament.regCloseAt
        : (tournament.status === 'RN' ? activeRound?.deadline : undefined);

    const showDaysLeft = isRegistered && !isFinished && Boolean(deadlineValue);

    const teamSize = tournament.minTeamSize === tournament.maxTeamSize
        ? `${tournament.maxTeamSize}`
        : `${tournament.minTeamSize}-${tournament.maxTeamSize}`;

    return (
        <div className={styles.row}>
            <InfoCard
                label="Команд"
                value={tournament.teamsCount ?? 0}
                icon={<PeopleIcon size={'2xl'} />}
                className={styles.card}
            />
            <InfoCard
                label="Макс. Команд"
                value={tournament.maxTeam ?? '—'}
                icon={<GridIcon size={'2xl'} />}
                className={styles.card}
            />
            <InfoCard
                label="учасників"
                value={teamSize}
                icon={<PersonIcon size={'2xl'} />}
                className={styles.card}
            />
            {showDaysLeft && (
                <InfoCard
                    label="Дні залишилося"
                    value={formatDeadline(deadlineValue)}
                    icon={<TimerIcon size={'2xl'} />}
                    variant="primary"
                    className={styles.card}
                />
            )}
        </div>
    );
};
