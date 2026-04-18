import { baseApi } from '@shared/api/baseApi';
import type {
  TournamentDto,
  TournamentDomain,
  RoundDto,
  UserTournamentRole
} from '../model/tournament.types';
import type { TournamentFilters, LeaderboardItemDto } from './types';
import { mapTournamentToDomain } from '../lib/mappers';
import type { SubmissionDto } from '@entities/team/model/team.types';

export const tournamentApi = {
  getTournaments: async (filters: TournamentFilters = {}): Promise<TournamentDomain[]> => {
    const { data } = await baseApi.get<TournamentDto[]>('/tournaments', {
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

  getRounds: async (tournamentId: number): Promise<RoundDto[]> => {
    const { data } = await baseApi.get<RoundDto[]>(`/tournaments/${tournamentId}/rounds`);
    return data;
  },

  getRoundSubmissions: async (tournamentId: number, roundId: number): Promise<SubmissionDto[]> => {
    const { data } = await baseApi.get<SubmissionDto[]>(`/admin/tournaments/${tournamentId}/rounds/${roundId}/submit`);
    return data;
  },
};
