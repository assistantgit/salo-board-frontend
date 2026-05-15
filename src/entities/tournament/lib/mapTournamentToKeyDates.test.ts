import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mapTournamentToKeyDates } from './mapTournamentToKeyDates';

describe('mapTournamentToKeyDates', () => {
  const mockNow = new Date('2024-05-01T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mockTournament = {
    regOpenAt: new Date('2024-04-01T00:00:00Z'),
    regCloseAt: new Date('2024-04-15T00:00:00Z'),
    startDate: new Date('2024-06-01T00:00:00Z'),
    endedAt: new Date('2024-06-15T00:00:00Z'),
  };

  it('should map dates with correct states (all states present)', () => {
    // 2 past dates (completed), 1st future date (active), 2nd future date (upcoming)
    const dates = mapTournamentToKeyDates(mockTournament);

    expect(dates).toHaveLength(4);
    expect(dates[0].state).toBe('completed'); // Apr 1
    expect(dates[1].state).toBe('completed'); // Apr 15
    expect(dates[2].state).toBe('active'); // Jun 1 (first upcoming)
    expect(dates[3].state).toBe('upcoming'); // Jun 15
  });

  it('should mark all as completed if all dates are in the past', () => {
    const pastTournament = {
      regOpenAt: new Date('2024-01-01T00:00:00Z'),
      regCloseAt: new Date('2024-01-15T00:00:00Z'),
      startDate: new Date('2024-02-01T00:00:00Z'),
      endedAt: new Date('2024-02-15T00:00:00Z'),
    };
    const dates = mapTournamentToKeyDates(pastTournament);
    expect(dates.every((d) => d.state === 'completed')).toBe(true);
  });

  it('should mark first as active if all dates are in the future', () => {
    const futureTournament = {
      regOpenAt: new Date('2024-07-01T00:00:00Z'),
      regCloseAt: new Date('2024-07-15T00:00:00Z'),
      startDate: new Date('2024-08-01T00:00:00Z'),
      endedAt: new Date('2024-08-15T00:00:00Z'),
    };
    const dates = mapTournamentToKeyDates(futureTournament);
    expect(dates[0].state).toBe('active');
    expect(dates.slice(1).every((d) => d.state === 'upcoming')).toBe(true);
  });
});
