
import type { TournamentDto, TournamentFilters, LeaderboardItemDto } from './types';
import type { TournamentDomain } from '../model/tournament.types';
import { baseApi } from '@shared/api/baseApi';

export const tournamentApi = {
  getTournaments: async (filters: TournamentFilters = {}): Promise<TournamentDomain[]> => {
    const { data } = await baseApi.get<TournamentDto[]>('/tournaments', {
      params: filters,
    });

    return data.map(mapToDomain);
  },

  getTournamentById: async (id: number): Promise<TournamentDomain> => {
    const { data } = await baseApi.get<TournamentDto>(`/tournaments/${id}`);
    return mapToDomain(data);
  },

  getLeaderboard: async (tournamentId: number): Promise<LeaderboardItemDto[]> => {
    const { data } = await baseApi.get<LeaderboardItemDto[]>(`/tournaments/${tournamentId}/leaderboard`);
    return data;
  },
};

function mapToDomain(dto: TournamentDto): TournamentDomain {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    rules: dto.rules,
    organizer: dto.organizer || 'SaloBoardTeam',
    status: dto.status,
    startDate: new Date(dto.startDate),
    regOpenAt: new Date(dto.regOpenAt),
    regCloseAt: new Date(dto.regCloseAt),
    endedAt: new Date(dto.endedAt),
    isTeamVisible: dto.isTeamVisible,
    teamsCount: dto.teamsCount ?? 0,
    roundsCount: dto.roundsCount ?? 0,
    minTeamSize: dto.minTeamSize,
    maxTeamSize: dto.maxTeamSize,
    maxTeam: dto.maxTeam,
  };
}
