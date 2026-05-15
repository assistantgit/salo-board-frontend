import type { TournamentDomain, TournamentStatus } from '../model/tournament.types';

export interface TournamentMeta {
  dateLabel: string;
  dateValue: string;
  progress: number;
  regRange: string;
  durationRange: string;
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

const FORMAT_OPTIONS_SHORT: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
};

const isValidDate = (date: Date) => date instanceof Date && !Number.isNaN(date.getTime());

const formatDate = (date: Date): string => {
  if (!isValidDate(date)) return '—';
  return date.toLocaleDateString('uk-UA', FORMAT_OPTIONS);
};

const formatDateRange = (start: Date, end: Date): string => {
  if (!isValidDate(start) || !isValidDate(end)) return '—';
  const startStr = start.toLocaleDateString('uk-UA', FORMAT_OPTIONS_SHORT);
  const endStr = end.toLocaleDateString('uk-UA', FORMAT_OPTIONS_SHORT);
  return `${startStr} - ${endStr}`;
};

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

  const base = {
    regRange: formatDateRange(regOpenAt, regCloseAt),
    durationRange: formatDateRange(startDate, endedAt),
  };

  if (status === 'FN' || status === 'AR') {
    return {
      ...base,
      dateLabel: DATE_LABEL[status],
      dateValue: formatDate(endedAt),
      progress: 100,
    };
  }

  if (status === 'DR') {
    return {
      ...base,
      dateLabel: DATE_LABEL[status],
      dateValue: formatDate(startDate),
      progress: 0,
    };
  }

  // Registration phase
  if (status === 'RG') {
    return {
      ...base,
      dateLabel: DATE_LABEL[status],
      dateValue: formatDate(regCloseAt),
      progress: calcProgress(regOpenAt, regCloseAt),
    };
  }

  // Running phase (RN)
  return {
    ...base,
    dateLabel: DATE_LABEL[status],
    dateValue: formatDate(endedAt),
    progress: calcProgress(startDate, endedAt),
  };
};
