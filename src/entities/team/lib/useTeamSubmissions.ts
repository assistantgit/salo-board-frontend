import { useAuthStore } from '@entities/user';
import { useQuery } from '@tanstack/react-query';
import { teamApi } from '../api/team.api';

export const useTeamSubmissions = (teamId: number | undefined) => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return useQuery({
    queryKey: ['team-submissions-all', teamId],
    queryFn: () => teamApi.getTeamSubmissions(teamId!),
    enabled: !!teamId && isAuth,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
