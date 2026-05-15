import { formatUkDate } from '@shared/lib/format';
export interface KeyDateItem {
  label: string;
  date: string;
  /** 'completed'/'active' = filled dot, 'upcoming' = outlined dot */
  state: 'completed' | 'active' | 'upcoming';
}

/**
 * Maps tournament dates to KeyDateItem objects for UI display.
 */
export function mapTournamentToKeyDates(tournament: {
  regOpenAt: Date;
  regCloseAt: Date;
  startDate: Date;
  endedAt: Date;
}): KeyDateItem[] {
  const now = new Date();

  const entries = [
    { label: 'Відкрито реєстрацію', date: tournament.regOpenAt },
    { label: 'Закрито реєстрацію', date: tournament.regCloseAt },
    { label: 'Початок турніру', date: tournament.startDate },
    { label: 'Фінал', date: tournament.endedAt },
  ];

  let activeSet = false;

  return entries.map((entry): KeyDateItem => {
    const isPast = entry.date <= now;
    if (isPast) {
      return { label: entry.label, date: formatUkDate(entry.date), state: 'completed' };
    }
    if (!activeSet) {
      activeSet = true;
      return { label: entry.label, date: formatUkDate(entry.date), state: 'active' };
    }
    return { label: entry.label, date: formatUkDate(entry.date), state: 'upcoming' };
  });
}
