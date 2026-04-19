import { useQuery } from '@tanstack/react-query';
import { teamApi } from '../api/team.api';
import type { TeamDomain } from '../model/team.types';

export const useMyTeamInTournament = (tournamentId: number | undefined) => {
  return useQuery({
    queryKey: ['my-teams'],
    queryFn: () => teamApi.getMyTeams(),
    enabled: !!tournamentId,
    select: (teams: TeamDomain[]) => teams.find(t => t.tournamentId === tournamentId),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
