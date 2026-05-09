import { useAuthStore } from '@entities/user';
import { useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';
import type { UserTournamentRole } from '../model/tournament.types';

/**
 * Fetches user's active roles from GET /api/user/roles.
 * Returns only roles where the user has active (RG/RN) tournaments.
 */
export function useUserRoles() {
  const isAuth = useAuthStore((state) => state.isAuth);

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', 'roles'],
    queryFn: () => tournamentApi.getUserRoles(),
    staleTime: 60_000, // 1 minute — roles don't change often
    retry: 1,
    enabled: isAuth,
  });

  const activeRoles: UserTournamentRole[] = [];
  if (data?.participant) activeRoles.push('participant');
  if (data?.jury) activeRoles.push('jury');
  if (data?.admin) activeRoles.push('admin');

  const isStaff = activeRoles.includes('admin') || activeRoles.includes('jury');

  return {
    activeRoles,
    rolesData: data,
    isStaff,
    isLoading,
    error: error ? 'Помилка при завантаженні ролей.' : null,
  };
}
