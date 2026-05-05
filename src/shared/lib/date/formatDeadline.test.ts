import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatDeadline } from './formatDeadline';

describe('formatDeadline', () => {
  beforeEach(() => {
    // Mock the current date to a fixed value
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-05T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return "—" for falsy inputs', () => {
    expect(formatDeadline(undefined)).toBe('—');
    expect(formatDeadline('')).toBe('—');
  });

  it('should return "Завершено" if deadline is in the past', () => {
    const pastDate = new Date('2026-05-04T12:00:00Z');
    expect(formatDeadline(pastDate)).toBe('Завершено');
  });

  it('should return "Завершено" if deadline is exactly now', () => {
    const exactDate = new Date('2026-05-05T12:00:00Z');
    expect(formatDeadline(exactDate)).toBe('Завершено');
  });

  it('should format as "До HH:mm" if deadline is today', () => {
    // 3 hours later on the same day
    const laterToday = new Date('2026-05-05T15:30:00Z');

    // We need to match the locale time. Date.getHours() uses local time,
    // so we format the expected string dynamically based on the local time of the mock.
    const hours = laterToday.getHours().toString().padStart(2, '0');
    const minutes = laterToday.getMinutes().toString().padStart(2, '0');

    expect(formatDeadline(laterToday)).toBe(`До ${hours}:${minutes}`);
  });

  it('should format as "N дн." if deadline is 1 or more days away', () => {
    // 2 days later
    const futureDate = new Date('2026-05-07T12:00:00Z');
    expect(formatDeadline(futureDate)).toBe('2 дн.');
  });

  it('should format as "N дн." if deadline is less than a day but tomorrow', () => {
    // Current time is 12:00:00Z. Next day 10:00:00Z is 22 hours away, but on a different day
    // Due to Math.ceil in the implementation, any diff > 0 results in at least 1 day.
    const tomorrowMorning = new Date('2026-05-06T10:00:00Z');
    expect(formatDeadline(tomorrowMorning)).toBe('1 дн.');
  });
});
