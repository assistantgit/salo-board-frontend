import { useQuery } from '@tanstack/react-query';
import { teamApi } from '../api/team.api';
import type { TeamDomain } from '../model/team.types';

export const useMyTeams = () => {
  return useQuery<TeamDomain[]>({
    queryKey: ['my-teams'],
    queryFn: teamApi.getMyTeams,
    staleTime: 1000 * 60 * 5,
  });
};
