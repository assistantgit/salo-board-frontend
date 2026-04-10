import type { TournamentStatus } from '@entities/tournament';

/**
 * Extended status type for filter UI.
 * 'ALL' means "no status filter applied".
 */
export type TournamentFilterStatus = TournamentStatus | 'ALL';

/**
 * Full Zustand store shape for tournament filters.
 * Also holds the resolved tournament count so TournamentCount
 * can read it without making a second API request.
 */
export interface TournamentFilterState {
  search: string;
  status: TournamentFilterStatus;
  /** Count of tournaments returned by the last fetch. -1 = loading / unknown. */
  count: number;
  setSearch: (search: string) => void;
  setStatus: (status: TournamentFilterStatus) => void;
  setCount: (count: number) => void;
  reset: () => void;
}
