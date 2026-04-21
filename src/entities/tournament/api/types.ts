import type { TournamentStatus, UserTournamentRole } from '../model/tournament.types';

export interface TournamentFilters {
  name?: string;
  status?: TournamentStatus;
  role?: UserTournamentRole | 'all';
  isArchive?: boolean;
}
