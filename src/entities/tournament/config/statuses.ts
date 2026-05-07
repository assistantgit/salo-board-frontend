import type { TournamentStatus } from '../model/tournament.types';

export type TournamentVariant = 'default' | 'admin' | 'archive';

export const TOURNAMENT_STATUS_LABELS: Record<TournamentStatus, string> = {
  DR: 'Ще не почався',
  RG: 'Реєстрація відкрита',
  RN: 'У процесі',
  FN: 'Закінчений',
  AR: 'Архів',
};
