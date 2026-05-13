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
  response: PaginatedResponse<TournamentDto>,
): PaginatedResponse<TournamentDomain> {
  return {
    ...response,
    results: response.results.map(mapTournamentToDomain),
  };
}
