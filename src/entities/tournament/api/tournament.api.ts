import { baseApi } from '@shared/api/baseApi';
import type {
  TournamentDto,
  TournamentDomain,
  RoundDto,
  UserTournamentRole,
  JuryDto,
  JuryEvaluationDto,
  JuryEvaluationsCountDto,
  UserRolesDto,
  LeaderboardItemDto,
  TeamLeaderboardRoundDto,
} from '../model/tournament.types';
import type { TournamentFilters } from './types';
import { mapTournamentToDomain } from '../lib/mappers';
import type { SubmissionDto } from '@entities/team/model/team.types';

export const tournamentApi = {
  getTournaments: async (filters: TournamentFilters = {}): Promise<TournamentDomain[]> => {
    const { data } = await baseApi.get<TournamentDto[]>('/tournaments', {
      params: filters,
    });

    return data.map(mapTournamentToDomain);
  },

  getArchivedTournaments: async (filters: TournamentFilters = {}): Promise<TournamentDomain[]> => {
    const { data } = await baseApi.get<TournamentDto[]>('/tournaments/archive', {
      params: filters,
    });

    return data.map(mapTournamentToDomain);
  },

  getTournamentsByRole: async (role: UserTournamentRole): Promise<TournamentDomain[]> => {
    const { data } = await baseApi.get<TournamentDto[]>('/tournaments', {
      params: { role, status: 'RN' },
    });
    return data.map(mapTournamentToDomain);
  },

  getTournamentById: async (id: number): Promise<TournamentDomain> => {
    const { data } = await baseApi.get<TournamentDto>(`/tournaments/${id}`);
    return mapTournamentToDomain(data);
  },

  getLeaderboard: async (tournamentId: number): Promise<LeaderboardItemDto[]> => {
    const { data } = await baseApi.get<LeaderboardItemDto[]>(`/tournaments/${tournamentId}/leaderboard`);
    return data;
  },

  getTeamLeaderboardDetails: async (tournamentId: number, teamId: number): Promise<TeamLeaderboardRoundDto[]> => {
    const { data } = await baseApi.get<TeamLeaderboardRoundDto[]>(`/tournaments/${tournamentId}/leaderboard/${teamId}`);
    return data;
  },

  getRounds: async (tournamentId: number): Promise<RoundDto[]> => {
    const { data } = await baseApi.get<RoundDto[]>(`/tournaments/${tournamentId}/rounds`);
    return data;
  },

  getRoundSubmissions: async (tournamentId: number, roundId: number): Promise<SubmissionDto[]> => {
    const { data } = await baseApi.get<SubmissionDto[]>(`/admin/tournaments/${tournamentId}/rounds/${roundId}/submit`);
    return data;
  },

  getJury: async (tournamentId: number): Promise<JuryDto[]> => {
    const { data } = await baseApi.get<JuryDto[]>(`/tournaments/${tournamentId}/jury`);
    return data;
  },

  getJuryEvaluations: async (tournamentId: number, status?: 'DR' | 'SB'): Promise<JuryEvaluationDto[]> => {
    const { data } = await baseApi.get<JuryEvaluationDto[]>(`/tournaments/${tournamentId}/jury-evaluations`, {
      params: status ? { status } : undefined,
    });
    return data;
  },

  getJuryEvaluationsCount: async (tournamentId: number, status?: 'DR' | 'SB'): Promise<JuryEvaluationsCountDto> => {
    const { data } = await baseApi.get<JuryEvaluationsCountDto>(`/tournaments/${tournamentId}/jury-evaluations/count`, {
      params: status ? { status } : undefined,
    });
    return data;
  },

  getUserRoles: async (): Promise<UserRolesDto> => {
    const { data } = await baseApi.get<UserRolesDto>('/user/roles');
    return data;
  },
};
