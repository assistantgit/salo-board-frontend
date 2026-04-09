
import type { TournamentDto, TournamentFilters } from './types';
import type { TournamentDomain } from '../model/tournament.types';
import { baseApi } from '@shared/api/baseApi';

/**
 * Tournament API service.
 */
export const tournamentApi = {
  /**
   * Fetches the list of tournaments.
   */
  getTournaments: async (filters: TournamentFilters = {}): Promise<TournamentDomain[]> => {
    const { data } = await baseApi.get<TournamentDto[]>('/tournaments', {
      params: filters,
    });

    return data.map(mapToDomain);
  },

  /**
   * Fetches full details for a single tournament.
   */
  getTournamentById: async (id: number): Promise<TournamentDomain> => {
    const { data } = await baseApi.get<TournamentDto>(`/tournaments/${id}`);
    return mapToDomain(data);
  },
};

/**
 * Maps API DTO to Domain model.
 */
function mapToDomain(dto: TournamentDto): TournamentDomain {
  return {
    id: dto.id,
    title: dto.title,
    organizer: dto.organizer || 'DataSciUA', // Default while API doesn't provide it
    status: dto.status,
    startDate: new Date(dto.startDate),
    regOpenAt: new Date(dto.regOpenAt),
    regCloseAt: new Date(dto.regCloseAt),
    endedAt: new Date(dto.endedAt),
    teamsCount: dto.teamsCount ?? 0,
    roundsCount: dto.roundsCount ?? 0,
  };
}
