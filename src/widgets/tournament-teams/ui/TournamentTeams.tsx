import React, { useEffect, useState } from 'react';
import { teamApi, type TeamDomain, TeamRow } from '@entities/team';
import { TournamentProgressBar, useCurrentTournament } from '@entities/tournament';
import { Divider } from '@shared/ui/divider/Divider';
import { TeamsPagination } from '@features/teams-pagination';
import styles from './TournamentTeams.module.css';

const AVATAR_COLORS = ['#6d82eb', '#ff6c6c', '#95ea9a', '#facc15', '#a855f7'];
const ITEMS_PER_PAGE = 5;

export const TournamentTeams: React.FC = () => {
    const { tournament } = useCurrentTournament();
    const [teams, setTeams] = useState<TeamDomain[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (tournament && tournament.isTeamVisible) {
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
    }, [tournament?.id, tournament?.isTeamVisible]);

    if (!tournament) return null;

    const maxTeams = tournament.maxTeam || tournament.maxTeamSize || 16;
    const currentCount = teams.length || tournament.teamsCount || 0;
    const progress = Math.min((currentCount / maxTeams) * 100, 100);

    const totalPages = Math.ceil(teams.length / ITEMS_PER_PAGE);
    const currentTeams = teams.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <h2 className={styles.title}>Команди</h2>
                <TeamsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className={styles.paginationOverride}
                />
            </div>

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
                ) : currentTeams.length > 0 ? (
                    currentTeams.map((team, index) => (
                        <React.Fragment key={team.id}>
                            <TeamRow
                                team={team}
                                color={AVATAR_COLORS[((currentPage - 1) * ITEMS_PER_PAGE + index) % AVATAR_COLORS.length]}
                            />
                            {index < currentTeams.length - 1 && <Divider />}
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
