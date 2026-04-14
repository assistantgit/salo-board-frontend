import type { TournamentStatus } from '../model/tournament.types';

/**
 * Raw tournament data from API.
 */
export interface TournamentDto {
  title: string;
  id: number;
  description: string;
  rules: string;
  status: TournamentStatus;
  startDate: string;
  regOpenAt: string;
  regCloseAt: string;
  endedAt: string;
  organizer?: string;
  teamsCount?: number;
  roundsCount?: number;
  minTeamSize?: number;
  maxTeamSize?: number;
  maxTeam?: number;
}

/**
 * Filter parameters for tournament list.
 */
export interface TournamentFilters {
  name?: string;
  status?: TournamentStatus;
}
