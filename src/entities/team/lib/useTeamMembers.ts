import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { teamApi } from '../api/team.api';
import type { TeamMemberDto } from '../model/team.types';

export const TEAM_MEMBERS_QUERY_KEY = (teamId?: number) => ['team-members', teamId];

export const useTeamMembers = (teamId: number | undefined) => {
  return useQuery<TeamMemberDto[]>({
    queryKey: TEAM_MEMBERS_QUERY_KEY(teamId),
    queryFn: () => (teamId ? teamApi.getTeamMembers(teamId) : Promise.resolve([])),
    enabled: !!teamId,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};
