import type { SubmissionDto } from '@entities/team/model/team.types';
import { baseApi } from '@shared/api/baseApi';
import type { PaginatedResponse } from '@shared/api/types';
import { mapPaginatedTournaments, mapTournamentToDomain } from '../lib/mappers';
import type {
  JuryDto,
  JuryEvaluationDto,
  JuryEvaluationsCountDto,
  LeaderboardItemDto,
  TeamLeaderboardRoundDto,
  TournamentDomain,
  TournamentDto,
  UserRolesDto,
  UserTournamentRole,
} from '../model/tournament.types';
import type { TournamentFilters } from './types';

export const tournamentApi = {
  getTournaments: async (
    filters: TournamentFilters = {},
  ): Promise<PaginatedResponse<TournamentDomain>> => {
    const { data } = await baseApi.get<PaginatedResponse<TournamentDto>>('/tournaments', {
      params: filters,
    });

    return mapPaginatedTournaments(data);
  },

  getAdminTournaments: async (
    filters: TournamentFilters = {},
  ): Promise<PaginatedResponse<TournamentDomain>> => {
    const { data } = await baseApi.get<PaginatedResponse<TournamentDto>>('/admin/tournaments', {
      params: filters,
    });

    return mapPaginatedTournaments(data);
  },

  getArchivedTournaments: async (
    filters: TournamentFilters = {},
  ): Promise<PaginatedResponse<TournamentDomain>> => {
    const { data } = await baseApi.get<PaginatedResponse<TournamentDto>>('/tournaments/archive', {
      params: filters,
    });

    return mapPaginatedTournaments(data);
  },

  getTournamentsByRole: async (
    role: UserTournamentRole,
  ): Promise<PaginatedResponse<TournamentDomain>> => {
    const { data } = await baseApi.get<PaginatedResponse<TournamentDto>>('/tournaments', {
      params: { role, status: 'RN' },
    });
    return mapPaginatedTournaments(data);
  },

  getTournamentById: async (id: number): Promise<TournamentDomain> => {
    const { data } = await baseApi.get<TournamentDto>(`/tournaments/${id}`);
    return mapTournamentToDomain(data);
  },

  getLeaderboard: async (tournamentId: number): Promise<LeaderboardItemDto[]> => {
    const { data } = await baseApi.get<LeaderboardItemDto[]>(
      `/tournaments/${tournamentId}/leaderboard`,
    );
    return data;
  },

  getTeamLeaderboardDetails: async (
    tournamentId: number,
    teamId: number,
  ): Promise<TeamLeaderboardRoundDto[]> => {
    const { data } = await baseApi.get<TeamLeaderboardRoundDto[]>(
      `/tournaments/${tournamentId}/leaderboard/${teamId}`,
    );
    return data;
  },

  getRoundSubmissions: async (tournamentId: number, roundId: number): Promise<SubmissionDto[]> => {
    const { data } = await baseApi.get<SubmissionDto[]>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/submit`,
    );
    return data;
  },

  getAdminSubmission: async (
    tournamentId: number,
    roundId: number,
    submissionId: number,
  ): Promise<SubmissionDto> => {
    const { data } = await baseApi.get<SubmissionDto>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/submit/${submissionId}`,
    );
    return data;
  },

  getJury: async (tournamentId: number): Promise<JuryDto[]> => {
    const { data } = await baseApi.get<JuryDto[]>(`/tournaments/${tournamentId}/jury`);
    return data;
  },

  getAdminJury: async (tournamentId: number): Promise<JuryDto[]> => {
    const { data } = await baseApi.get<JuryDto[]>(`/admin/tournaments/${tournamentId}/jury`);
    return data;
  },

  getJuryEvaluations: async (
    tournamentId: number,
    status?: 'DR' | 'SB',
  ): Promise<JuryEvaluationDto[]> => {
    const { data } = await baseApi.get<JuryEvaluationDto[]>(
      `/tournaments/${tournamentId}/jury-evaluations`,
      {
        params: status ? { status } : undefined,
      },
    );
    return data;
  },

  getJuryEvaluationsCount: async (
    tournamentId: number,
    status?: 'DR' | 'SB',
  ): Promise<JuryEvaluationsCountDto> => {
    const { data } = await baseApi.get<JuryEvaluationsCountDto>(
      `/tournaments/${tournamentId}/jury-evaluations/count`,
      {
        params: status ? { status } : undefined,
      },
    );
    return data;
  },

  getUserRoles: async (): Promise<UserRolesDto> => {
    const { data } = await baseApi.get<UserRolesDto>('/user/roles');
    return data;
  },

  getAdminRoundEvaluations: async (
    tournamentId: number,
    roundId: number,
  ): Promise<JuryEvaluationDto[]> => {
    const { data } = await baseApi.get<JuryEvaluationDto[]>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/evaluation`,
    );
    return data;
  },

  getAdminEvaluationDetails: async (
    tournamentId: number,
    roundId: number,
    evaluationId: number,
  ): Promise<JuryEvaluationDto> => {
    const { data } = await baseApi.get<JuryEvaluationDto>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/evaluation/${evaluationId}`,
    );
    return data;
  },

  getAdminSubmissionDetails: async (
    tournamentId: number,
    roundId: number,
    submissionId: number,
  ): Promise<SubmissionDto> => {
    const { data } = await baseApi.get<SubmissionDto>(
      `/admin/tournaments/${tournamentId}/rounds/${roundId}/submit/${submissionId}`,
    );
    return data;
  },

  createTournament: async (payload: Partial<TournamentDto>): Promise<TournamentDomain> => {
    const { data } = await baseApi.post<TournamentDto>('/admin/tournaments', payload);
    return mapTournamentToDomain(data);
  },

  updateTournament: async (
    id: number,
    payload: Partial<TournamentDto>,
  ): Promise<TournamentDomain> => {
    const { data } = await baseApi.patch<TournamentDto>(`/admin/tournaments/${id}`, payload);
    return mapTournamentToDomain(data);
  },

  deleteTournament: async (id: number): Promise<void> => {
    await baseApi.delete(`/admin/tournaments/${id}`);
  },

  addJuryMember: async (tournamentId: number, inviteCode: string): Promise<JuryDto> => {
    const { data } = await baseApi.post<JuryDto>(`/admin/tournaments/${tournamentId}/jury`, {
      invite_code: inviteCode,
    });
    return data;
  },

  removeJuryMember: async (tournamentId: number, userId: number): Promise<void> => {
    await baseApi.delete(`/admin/tournaments/${tournamentId}/jury/${userId}`);
  },

  startTournament: async (id: number): Promise<TournamentDomain> => {
    const { data } = await baseApi.patch<TournamentDto>(`/admin/tournaments/${id}/start`);
    return mapTournamentToDomain(data);
  },

  startRegistration: async (id: number): Promise<TournamentDomain> => {
    const { data } = await baseApi.patch<TournamentDto>(
      `/admin/tournaments/${id}/start-registration`,
    );
    return mapTournamentToDomain(data);
  },

  closeRegistration: async (id: number): Promise<TournamentDomain> => {
    const { data } = await baseApi.patch<TournamentDto>(
      `/admin/tournaments/${id}/close-registration`,
    );
    return mapTournamentToDomain(data);
  },

  finishTournament: async (id: number): Promise<TournamentDomain> => {
    const { data } = await baseApi.patch<TournamentDto>(`/admin/tournaments/${id}/finish`);
    return mapTournamentToDomain(data);
  },

  archiveTournament: async (id: number): Promise<TournamentDomain> => {
    const { data } = await baseApi.patch<TournamentDto>(`/admin/tournaments/${id}/archive`);
    return mapTournamentToDomain(data);
  },
};
