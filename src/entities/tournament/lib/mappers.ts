import type { PaginatedResponse } from '@shared/api/types';
import type { TournamentDomain, TournamentDto } from '../model/tournament.types';

/**
 * Maps TournamentDto to TournamentDomain.
 * Decouples raw API data from business domain logic.
 */
export function mapTournamentToDomain(dto: TournamentDto): TournamentDomain {
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

export function mapPaginatedTournaments(
  response: PaginatedResponse<TournamentDto> | TournamentDto[],
): PaginatedResponse<TournamentDomain> {
  // If response is a direct array (not paginated)
  if (Array.isArray(response)) {
    return {
      count: response.length,
      next: null,
      previous: null,
      results: response.map(mapTournamentToDomain),
    };
  }

  // Standard paginated response
  return {
    ...response,
    count: response?.count ?? 0,
    next: response?.next ?? null,
    previous: response?.previous ?? null,
    results: (response?.results || []).map(mapTournamentToDomain),
  };
}
