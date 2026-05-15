import { baseApi } from '@shared/api/baseApi';
import { mapTeamToDomain } from '../lib/mapTeamToDomain';
import type { TeamDomain, TeamDto, TeamMemberDto } from '../model/team.types';

export const adminTeamApi = {
  /**
   * GET /api/admin/tournaments/{tournament_id}/teams
   * Команди турніру (Адмін)
   */
  getAdminTeams: async (tournamentId: number): Promise<TeamDomain[]> => {
    const { data } = await baseApi.get<TeamDto[]>(`/admin/tournaments/${tournamentId}/teams`);
    return data.map(mapTeamToDomain);
  },

  /**
   * PATCH /api/admin/tournaments/{tournament_id}/teams/{team_id}/disqualify
   * Дискваліфікувати команду (Адмін)
   */
  disqualifyTeam: async (tournamentId: number, teamId: number): Promise<void> => {
    await baseApi.patch(`/admin/tournaments/${tournamentId}/teams/${teamId}/disqualify`);
  },

  /**
   * GET /api/admin/tournaments/{tournament_id}/teams/{team_id}/participants
   * Список учасників команди (Адмін)
   */
  getTeamParticipants: async (tournamentId: number, teamId: number): Promise<TeamMemberDto[]> => {
    const { data } = await baseApi.get<TeamMemberDto[]>(
      `/admin/tournaments/${tournamentId}/teams/${teamId}/participants`,
    );
    return data;
  },

  /**
   * PATCH /api/admin/tournaments/{tournament_id}/teams/{team_id}/participants/{user_id}
   * Передати статус командира (Адмін)
   */
  transferCaptainStatus: async (
    tournamentId: number,
    teamId: number,
    userId: number,
  ): Promise<void> => {
    await baseApi.patch(
      `/admin/tournaments/${tournamentId}/teams/${teamId}/participants/${userId}`,
    );
  },

  /**
   * DELETE /api/admin/tournaments/{tournament_id}/teams/{team_id}/participants/{user_id}
   * Видалити учасника (Адмін)
   */
  removeParticipant: async (
    tournamentId: number,
    teamId: number,
    userId: number,
  ): Promise<void> => {
    await baseApi.delete(
      `/admin/tournaments/${tournamentId}/teams/${teamId}/participants/${userId}`,
    );
  },
};
