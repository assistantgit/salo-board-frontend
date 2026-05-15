import type { TournamentStatus } from '../model/tournament.types';

export type TournamentVariant = 'default' | 'admin' | 'archive' | 'jury';

export interface TournamentTabItem {
  id: string;
  label: string;
  dotColor?: string;
}

export const TOURNAMENT_STATUS_LABELS: Record<TournamentStatus, string> = {
  DR: 'Ще не почався',
  RG: 'Реєстрація відкрита',
  RN: 'У процесі',
  FN: 'Закінчений',
  AR: 'Архів',
};

/**
 * Centralized dot/accent colors for tournament statuses.
 * These colors are used for filter dots and hero accents.
 */
export const TOURNAMENT_STATUS_COLORS: Record<TournamentStatus, string> = {
  RG: '#469650',
  RN: '#be3638',
  FN: '#2c23d5',
  AR: '#797979',
  DR: '#8b2aa3',
};

/**
 * Main Tournament Status Tabs (Homepage, Admin, Jury Discovery).
 */
export const TOURNAMENT_MAIN_TABS: readonly TournamentTabItem[] = [
  { id: 'ALL', label: 'Всі' },
  { id: 'RG', label: TOURNAMENT_STATUS_LABELS.RG, dotColor: TOURNAMENT_STATUS_COLORS.RG },
  { id: 'RN', label: TOURNAMENT_STATUS_LABELS.RN, dotColor: TOURNAMENT_STATUS_COLORS.RN },
  { id: 'FN', label: TOURNAMENT_STATUS_LABELS.FN, dotColor: TOURNAMENT_STATUS_COLORS.FN },
  { id: 'AR', label: TOURNAMENT_STATUS_LABELS.AR, dotColor: TOURNAMENT_STATUS_COLORS.AR },
  { id: 'DR', label: TOURNAMENT_STATUS_LABELS.DR, dotColor: TOURNAMENT_STATUS_COLORS.DR },
];

/**
 * Configuration for History Tournament Tabs (Profile).
 */
export const TOURNAMENT_HISTORY_TABS: readonly TournamentTabItem[] = [
  { id: 'ALL', label: 'Всі' },
  { id: 'active', label: 'У процесі', dotColor: TOURNAMENT_STATUS_COLORS.RN },
  { id: 'completed', label: 'Закінчені', dotColor: TOURNAMENT_STATUS_COLORS.FN },
  { id: 'archive', label: 'Архівні', dotColor: TOURNAMENT_STATUS_COLORS.AR },
];
