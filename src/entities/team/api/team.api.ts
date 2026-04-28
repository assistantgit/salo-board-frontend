import { baseApi } from '@shared/api/baseApi';
import { mapTeamToDomain } from '../lib/mapTeamToDomain';
import type { SubmissionDto, TeamDomain, TeamDto } from '../model/team.types';

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
};
