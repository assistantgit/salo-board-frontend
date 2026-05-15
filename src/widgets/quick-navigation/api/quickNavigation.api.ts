/**
 * Widget-level API layer for QuickNavigation.
 * Aggregates data from entity APIs — does NOT contain raw axios calls.
 * If a widget-specific endpoint is needed in the future, add it here.
 *
 * FSD: widgets can have their own api/ slice that delegates to entities.
 */

import type { TournamentDomain, UserRolesDto, UserTournamentRole } from '@entities/tournament';
import { tournamentApi } from '@entities/tournament';

export interface RoleWithTournaments {
  role: UserTournamentRole;
  tournaments: TournamentDomain[];
}

export const quickNavigationApi = {
  /**
   * GET /api/user/roles
   * Returns which roles the current user has in active tournaments.
   */
  getUserRoles: (): Promise<UserRolesDto> => tournamentApi.getUserRoles(),

  /**
   * GET /api/tournaments?role=<role>&status=RN
   * Returns tournaments filtered by role and running status.
   */
  getTournamentsByRole: async (role: UserTournamentRole): Promise<TournamentDomain[]> => {
    const res = await tournamentApi.getTournamentsByRole(role);
    return res.results;
  },
};
