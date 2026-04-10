import type { TournamentStatus } from '../model/tournament.types';

/**
 * Raw tournament data from API.
 */
export interface TournamentDto {
  id: number;
  title: string;
  status: TournamentStatus;
  startDate: string;
  regOpenAt: string;
  regCloseAt: string;
  endedAt: string;
  // These might be extra fields added by backend or inferred
  organizer?: string;
  teamsCount?: number;
  roundsCount?: number;
}

/**
 * Filter parameters for tournament list.
 */
export interface TournamentFilters {
  name?: string;
  status?: TournamentStatus;
}
