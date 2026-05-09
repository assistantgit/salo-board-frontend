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

const formatDate = (date: Date): string => date.toLocaleDateString('uk-UA', FORMAT_OPTIONS);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const calcProgress = (start: Date, end: Date): number => {
  const now = Date.now();
  const startTime = start.getTime();
  const endTime = end.getTime();

  if (now < startTime) return 0;
  if (now >= endTime) return 100;

  const total = endTime - startTime;
  if (total <= 0) return 0;

  const elapsed = now - startTime;
  return Math.round(clamp((elapsed / total) * 100, 0, 100));
};

export const getTournamentMeta = (tournament: TournamentDomain): TournamentMeta => {
  const { status, startDate, endedAt, regOpenAt, regCloseAt } = tournament;

  if (status === 'FN' || status === 'AR') {
    return { dateLabel: DATE_LABEL[status], dateValue: formatDate(endedAt), progress: 100 };
  }

  if (status === 'DR') {
    return { dateLabel: DATE_LABEL[status], dateValue: formatDate(startDate), progress: 0 };
  }

  // Registration phase
  if (status === 'RG') {
    return {
      dateLabel: DATE_LABEL[status],
      dateValue: formatDate(regCloseAt),
      progress: calcProgress(regOpenAt, regCloseAt),
    };
  }

  // Running phase (RN)
  return {
    dateLabel: DATE_LABEL[status],
    dateValue: formatDate(endedAt),
    progress: calcProgress(regCloseAt, endedAt),
  };
};
