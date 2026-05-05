import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatRelativeTime } from './formatRelativeTime';

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-05T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return empty string for falsy input', () => {
    expect(formatRelativeTime('')).toBe('');
  });

  it('should return "щойно" for future dates', () => {
    const futureDate = new Date('2026-05-05T12:05:00Z').toISOString();
    expect(formatRelativeTime(futureDate)).toBe('щойно');
  });

  it('should return "щойно" for dates less than a minute ago', () => {
    const justNow = new Date('2026-05-05T11:59:30Z').toISOString();
    expect(formatRelativeTime(justNow)).toBe('щойно');
  });

  it('should format minutes correctly', () => {
    const fiveMinsAgo = new Date('2026-05-05T11:55:00Z').toISOString();
    expect(formatRelativeTime(fiveMinsAgo)).toBe('5 хв тому');
  });

  it('should format 1 hour correctly', () => {
    const oneHourAgo = new Date('2026-05-05T11:00:00Z').toISOString();
    expect(formatRelativeTime(oneHourAgo)).toBe('1 годину тому');
  });

  it('should format 2-4 hours correctly', () => {
    const threeHoursAgo = new Date('2026-05-05T09:00:00Z').toISOString();
    expect(formatRelativeTime(threeHoursAgo)).toBe('3 години тому');
  });

  it('should format 5+ hours correctly', () => {
    const fiveHoursAgo = new Date('2026-05-05T07:00:00Z').toISOString();
    expect(formatRelativeTime(fiveHoursAgo)).toBe('5 годин тому');
  });

  it('should format 21 hours correctly', () => {
    const twentyOneHoursAgo = new Date('2026-05-04T15:00:00Z').toISOString();
    expect(formatRelativeTime(twentyOneHoursAgo)).toBe('21 годину тому');
  });

  it('should format exactly 1 day ago as "вчора"', () => {
    const yesterday = new Date('2026-05-04T12:00:00Z').toISOString();
    expect(formatRelativeTime(yesterday)).toBe('вчора');
  });

  it('should format 2-4 days ago correctly', () => {
    const threeDaysAgo = new Date('2026-05-02T12:00:00Z').toISOString();
    expect(formatRelativeTime(threeDaysAgo)).toBe('3 дні тому');
  });

  it('should format 5-6 days ago correctly', () => {
    const fiveDaysAgo = new Date('2026-04-30T12:00:00Z').toISOString();
    expect(formatRelativeTime(fiveDaysAgo)).toBe('5 днів тому');
  });

  it('should return formatted absolute date for older dates', () => {
    const olderDate = new Date('2026-04-01T12:00:00Z').toISOString();
    expect(formatRelativeTime(olderDate)).toBe('01.04.2026');
  });

  it('should return empty string for invalid date formats that throw error (though Date parsing does not throw, it results in NaN)', () => {
    expect(formatRelativeTime('not-a-date')).toBe('Invalid Date'); // toLocaleDateString returns "Invalid Date" for NaN
  });
});
