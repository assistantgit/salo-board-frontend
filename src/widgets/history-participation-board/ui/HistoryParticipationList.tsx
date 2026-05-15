import { HistoryTeamCard, useUserTeamsArchive } from '@entities/team';
import { Skeleton } from '@shared/ui';
import type React from 'react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HistoryParticipationList.module.css';

interface HistoryParticipationListProps {
  searchQuery: string;
}

export const HistoryParticipationList: React.FC<HistoryParticipationListProps> = ({
  searchQuery,
}) => {
  const navigate = useNavigate();
  const { data: teams, isLoading } = useUserTeamsArchive();

  const filteredTeams = useMemo(() => {
    if (!teams) return [];
    if (!searchQuery) return teams;
    const query = searchQuery.toLowerCase();
    return teams.filter(
      (team) =>
        team.name.toLowerCase().includes(query) ||
        team.tournamentTitle?.toLowerCase().includes(query),
    );
  }, [teams, searchQuery]);

  const handleView = (tournamentId: number) => {
    navigate(`/tournaments/${tournamentId}`);
  };

  if (isLoading) {
    return (
      <div className={styles.list}>
        {['s1', 's2', 's3', 's4', 's5', 's6'].map((key) => (
          <Skeleton key={key} height={100} borderRadius={16} />
        ))}
      </div>
    );
  }

  if (!filteredTeams.length) {
    return (
      <div className={styles.empty}>
        <p>Нічого не знайдено</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {filteredTeams.map((team) => (
        <HistoryTeamCard key={team.id} team={team} onView={() => handleView(team.tournamentId)} />
      ))}
    </div>
  );
};
