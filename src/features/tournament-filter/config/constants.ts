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
  { id: 'RG', label: 'Реєстрація відкрита', dotColor: '#469650' },
  { id: 'RN', label: 'У процесі', dotColor: '#be3638' },
  { id: 'FN', label: 'Закінчений', dotColor: '#2c23d5' },
  { id: 'AR', label: 'Архівний', dotColor: '#797979' },
  { id: 'DR', label: 'Ще не почався', dotColor: '#8b2aa3' },
];
