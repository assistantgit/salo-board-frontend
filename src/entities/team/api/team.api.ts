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
  getTeamsByTournamentId: async (tournamentId: number): Promise<TeamDomain[]> => {
    const { data } = await baseApi.get<TeamDto[]>(`/tournaments/${tournamentId}/teams`);
    return data.map(mapTeamToDomain);
  },

  getMyTeams: async (): Promise<TeamDomain[]> => {
    const { data } = await baseApi.get<TeamDto[]>('/teams');
    return data.map(mapTeamToDomain);
  },

  getTeamSubmissions: async (teamId: number): Promise<SubmissionDto[]> => {
    const { data } = await baseApi.get<SubmissionDto[]>(`/teams/${teamId}/submit`);
    return data;
  },

  getTeamMembers: async (teamId: number): Promise<TeamMemberDto[]> => {
    const { data } = await baseApi.get<TeamMemberDto[]>(`/teams/${teamId}/participant`);
    return data;
  },

  getTeamInvites: async (teamId: number): Promise<TeamInvitationDto[]> => {
    const { data } = await baseApi.get<TeamInvitationDto[]>(`/teams/${teamId}/invites`);
    return data;
  },

  addMember: async (teamId: number, inviteCode: string): Promise<void> => {
    await baseApi.post(
      `/teams/${teamId}/participant`,
      {},
      {
        params: { invite_code: inviteCode },
      },
    );
  },

  removeMember: async (teamId: number, memberId: string): Promise<void> => {
    await baseApi.delete(`/teams/${teamId}/participant/${memberId}`);
  },

  leaveTeam: async (teamId: number, newCaptainId?: string): Promise<void> => {
    await baseApi.delete(`/teams/${teamId}/participant/me`, {
      data: newCaptainId ? { new_captain_id: newCaptainId } : undefined,
    });
  },

  disbandTeam: async (teamId: number): Promise<void> => {
    await baseApi.delete(`/teams/${teamId}`);
  },
};
