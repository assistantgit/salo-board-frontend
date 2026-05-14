import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { teamApi } from '../api/team.api';
import type { TeamInvitationDto } from '../model/team.types';

export const TEAM_INVITES_QUERY_KEY = (teamId?: number) => ['team-invites', teamId];

export const useTeamInvites = (teamId: number | undefined) => {
  return useQuery<TeamInvitationDto[]>({
    queryKey: TEAM_INVITES_QUERY_KEY(teamId),
    queryFn: () => (teamId ? teamApi.getTeamInvites(teamId) : Promise.resolve([])),
    enabled: !!teamId,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};
