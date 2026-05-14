import { useAuthStore } from '@entities/user';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { teamApi } from '../api/team.api';

export const useTeamSubmissions = (teamId: number | undefined) => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return useQuery({
    queryKey: ['team-submissions-all', teamId],
    queryFn: () => {
      if (!teamId) throw new Error('Team ID is required');
      return teamApi.getTeamSubmissions(teamId);
    },
    enabled: !!teamId && isAuth,
    placeholderData: keepPreviousData,
  });
};
