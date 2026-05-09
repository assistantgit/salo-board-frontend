import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TournamentDomain } from '../model/tournament.types';
import { getTournamentMeta } from './getTournamentMeta';

describe('getTournamentMeta', () => {
  const mockDate = new Date('2024-05-01T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const baseTournament: TournamentDomain = {
    id: 1,
    title: 'Test Tournament',
    organizer: 'Test Organizer',
    status: 'DR',
    startDate: new Date('2024-05-01T00:00:00Z'),
    endedAt: new Date('2024-05-10T00:00:00Z'),
    teamsCount: 10,
    roundsCount: 5,
    description: '',
    rules: '',
    regOpenAt: new Date(),
    regCloseAt: new Date(),
  };

  it('should return meta for Draft status (DR)', () => {
    const meta = getTournamentMeta({ ...baseTournament, status: 'DR' });
    expect(meta.dateLabel).toBe('Початок');
    expect(meta.dateValue).toContain('01');
    expect(meta.progress).toBe(0);
  });

  it('should return 100% progress for Finished (FN) status', () => {
    const meta = getTournamentMeta({ ...baseTournament, status: 'FN' });
    expect(meta.dateLabel).toBe('Закінчився');
    expect(meta.progress).toBe(100);
  });

  it('should return 100% progress for Archived (AR) status', () => {
    const meta = getTournamentMeta({ ...baseTournament, status: 'AR' });
    expect(meta.dateLabel).toBe('Закінчився');
    expect(meta.progress).toBe(100);
  });

  it('should calculate progress for In Progress (RN) status', () => {
    // Current date is May 1st 12:00
    // Start: May 1st 00:00, End: May 10th 00:00
    // Total: 9 days. Elapsed: 12 hours.
    // (12 / (9 * 24)) * 100 = (0.5 / 216) * 100 approx 0.23% -> rounded to 0
    const meta = getTournamentMeta({
      ...baseTournament,
      status: 'RN',
      startDate: new Date('2024-05-01T00:00:00Z'),
      endedAt: new Date('2024-05-02T00:00:00Z'), // 1 day total
    });
    // Elapsed 12h out of 24h = 50%
    expect(meta.progress).toBe(50);
  });

  it('should handle registration status (RG)', () => {
    // Current date is May 1st 12:00
    // Reg: May 1st 00:00 to May 2nd 00:00
    const meta = getTournamentMeta({
      ...baseTournament,
      status: 'RG',
      regOpenAt: new Date('2024-05-01T00:00:00Z'),
      regCloseAt: new Date('2024-05-02T00:00:00Z'),
    });
    expect(meta.dateLabel).toBe('Закінчиться');
    expect(meta.progress).toBe(50);
  });

  it('should clamp progress between 0 and 100', () => {
    const pastTournament = {
      ...baseTournament,
      status: 'RN' as const,
      startDate: new Date('2024-04-01T00:00:00Z'),
      endedAt: new Date('2024-04-10T00:00:00Z'),
    };
    // Current date is 2024-05-01, so it's already ended
    const meta = getTournamentMeta(pastTournament);
    expect(meta.progress).toBe(100);

    const futureTournament = {
      ...baseTournament,
      status: 'RN' as const,
      startDate: new Date('2024-06-01T00:00:00Z'),
      endedAt: new Date('2024-06-10T00:00:00Z'),
    };
    // Current date is 2024-05-01, so it hasn't started
    const metaFuture = getTournamentMeta(futureTournament);
    expect(metaFuture.progress).toBe(0);
  });

  it('should return 0 progress if total duration is zero or negative', () => {
    const invalidTournament = {
      ...baseTournament,
      status: 'RN' as const,
      startDate: new Date('2024-05-10T00:00:00Z'),
      endedAt: new Date('2024-05-01T00:00:00Z'), // End before start
    };
    const meta = getTournamentMeta(invalidTournament);
    expect(meta.progress).toBe(0);
  });
});
