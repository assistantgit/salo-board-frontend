import type { TournamentDomain, TournamentStatus } from '../model/tournament.types';

export interface TournamentMeta {
  dateLabel: string;
  dateValue: string;
  progress: number;
}

const DATE_LABEL: Record<TournamentStatus, string> = {
  FN: 'Закінчився',
  AR: 'Закінчився',
  DR: 'Початок',
  RN: 'Закінчиться',
  RG: 'Закінчиться',
};

const FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
};

const formatDate = (date: Date): string =>
  date.toLocaleDateString('uk-UA', FORMAT_OPTIONS);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const calcProgress = (start: Date, end: Date): number => {
  const total = end.getTime() - start.getTime();
  if (total <= 0) return 0;
  const elapsed = Date.now() - start.getTime();
  return Math.round(clamp((elapsed / total) * 100, 0, 100));
};

export const getTournamentMeta = (tournament: TournamentDomain): TournamentMeta => {
  const { status, startDate, endedAt } = tournament;

  if (status === 'FN' || status === 'AR') {
    return { dateLabel: DATE_LABEL[status], dateValue: formatDate(endedAt), progress: 100 };
  }

  if (status === 'DR') {
    return { dateLabel: DATE_LABEL[status], dateValue: formatDate(startDate), progress: 0 };
  }

  return {
    dateLabel: DATE_LABEL[status],
    dateValue: formatDate(endedAt),
    progress: calcProgress(startDate, endedAt),
  };
};
