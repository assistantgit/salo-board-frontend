import { baseApi } from '@shared/api/baseApi';
import { mapTeamToDomain } from '../lib/mapTeamToDomain';
import type {
  SubmissionDto,
  TeamDomain,
  TeamDto,
  TeamInvitationDto,
  TeamMemberDto,
} from '../model/team.types';

export const teamApi = {
  // GET /api/teams — returns tournament as plain number id
  getMyTeams: async (): Promise<TeamDomain[]> => {
    const { data } = await baseApi.get<TeamDto[]>('/teams');
    return data.map(mapTeamToDomain);
  },

  // GET /api/tournaments/{id}/teams
  getTeamsByTournamentId: async (tournamentId: number): Promise<TeamDomain[]> => {
    const { data } = await baseApi.get<TeamDto[]>(`/tournaments/${tournamentId}/teams`);
    return data.map(mapTeamToDomain);
  },

  // GET /api/teams/{team_id}/submit
  getTeamSubmissions: async (teamId: number): Promise<SubmissionDto[]> => {
    const { data } = await baseApi.get<SubmissionDto[]>(`/teams/${teamId}/submit`);
    return data;
  },

  // GET /api/teams/{team_id}/participant
  getTeamMembers: async (teamId: number): Promise<TeamMemberDto[]> => {
    const { data } = await baseApi.get<TeamMemberDto[]>(`/teams/${teamId}/participant`);
    return data;
  },

  // GET /api/teams/{team_id}/invites
  getTeamInvites: async (teamId: number): Promise<TeamInvitationDto[]> => {
    const { data } = await baseApi.get<TeamInvitationDto[]>(`/teams/${teamId}/invites`);
    return data;
  },

  // GET /api/teams/{team_id}/participant/can-add — returns plain boolean true/false
  canAddParticipant: async (teamId: number): Promise<boolean> => {
    try {
      const { data } = await baseApi.get<boolean>(`/teams/${teamId}/participant/can-add`);
      return Boolean(data);
    } catch {
      return false;
    }
  },

  // POST /api/teams/{team_id}/participant?invite_code=...
  addMember: async (teamId: number, inviteCode: string): Promise<void> => {
    await baseApi.post(`/teams/${teamId}/participant`, undefined, {
      params: { invite_code: inviteCode },
    });
  },

  // DELETE /api/teams/{team_id}/participant/{user_id}
  // user_id can be a numeric user id or the string 'me'
  removeMember: async (teamId: number, userId: string | number): Promise<void> => {
    await baseApi.delete(`/teams/${teamId}/participant/${userId}`);
  },

  // DELETE /api/teams/{team_id}/participant/me  (captain passing new_captain_id)
  leaveTeam: async (teamId: number, newCaptainId?: string | number): Promise<void> => {
    await baseApi.delete(`/teams/${teamId}/participant/me`, {
      data: newCaptainId ? { new_captain_id: newCaptainId } : undefined,
    });
  },

  // DELETE /api/teams/{team_id}  (disband — separate endpoint)
  disbandTeam: async (teamId: number): Promise<void> => {
    await baseApi.delete(`/teams/${teamId}`);
  },
  // GET /api/teams/archive — returns archived teams for user
  getArchiveTeams: async (): Promise<TeamDomain[]> => {
    const { data } = await baseApi.get<TeamDto[]>('/teams/archive');
    return data.map(mapTeamToDomain);
  },
};
