import React, { useEffect, useState } from 'react';
import { teamApi, type TeamDomain, TeamRow } from '@entities/team';
import { type TournamentDomain, TournamentProgressBar } from '@entities/tournament';
import { Divider } from '@shared/ui/divider/Divider';
import styles from './TournamentTeams.module.css';

interface TournamentTeamsProps {
    tournament: TournamentDomain;
}

const AVATAR_COLORS = ['#6d82eb', '#ff6c6c', '#95ea9a', '#facc15', '#a855f7'];

export const TournamentTeams: React.FC<TournamentTeamsProps> = ({ tournament }) => {
    const [teams, setTeams] = useState<TeamDomain[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (tournament.isTeamVisible) {
            const fetchTeams = async () => {
                setIsLoading(true);
                try {
                    const data = await teamApi.getTeamsByTournamentId(tournament.id);
                    setTeams(data);
                } catch (error) {
                    console.error('Failed to fetch teams:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchTeams();
        }
    }, [tournament.id, tournament.isTeamVisible]);

    const maxTeams = tournament.maxTeam || tournament.maxTeamSize || 16;
    const currentCount = teams.length || tournament.teamsCount || 0;
    const progress = Math.min((currentCount / maxTeams) * 100, 100);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Команди</h2>

            <Divider />

            <div className={styles.statsRow}>
                <span className={styles.stats}>
                    {currentCount}/{maxTeams} команд
                </span>
            </div>

            <TournamentProgressBar
                progress={progress}
                status={tournament.status}
                showLabel={false}
                className={styles.progressBarOverride}
            />

            <div className={styles.teamList}>
                {isLoading ? (
                    <div className={styles.empty}>Завантаження...</div>
                ) : teams.length > 0 ? (
                    teams.map((team, index) => (
                        <React.Fragment key={team.id}>
                            <TeamRow
                                team={team}
                                color={AVATAR_COLORS[index % AVATAR_COLORS.length]}
                            />
                            {index < teams.length - 1 && <Divider />}
                        </React.Fragment>
                    ))
                ) : (
                    <div className={styles.empty}>
                        {tournament.isTeamVisible
                            ? 'Команди ще не зареєстровані'
                            : 'Список команд приховано організатором'}
                    </div>
                )}
            </div>
        </div>
    );
};
