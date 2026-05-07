import { TOURNAMENT_STATUS_LABELS } from '@entities/tournament';
import type { TournamentFilterStatus } from '../model/types';

/**
 * Shape of a single status tab item.
 * Lives in config/ per FSD segment rules (constants & types, not components).
 */
export interface StatusTabItem {
  id: TournamentFilterStatus;
  label: string;
  /** Dot indicator color. Absent for 'ALL' (shows no dot). */
  dotColor?: string;
}

/**
 * Static list of available status filter tabs.
 * Open/Closed: add a new status by appending here — TournamentStatusTabs never changes.
 */
export const STATUS_TABS: StatusTabItem[] = [
  { id: 'ALL', label: 'Всі' },
  { id: 'RG', label: TOURNAMENT_STATUS_LABELS.RG, dotColor: '#469650' },
  { id: 'RN', label: TOURNAMENT_STATUS_LABELS.RN, dotColor: '#be3638' },
  { id: 'FN', label: TOURNAMENT_STATUS_LABELS.FN, dotColor: '#2c23d5' },
  { id: 'AR', label: TOURNAMENT_STATUS_LABELS.AR, dotColor: '#797979' },
  { id: 'DR', label: TOURNAMENT_STATUS_LABELS.DR, dotColor: '#8b2aa3' },
];
