import { describe, expect, it } from 'vitest';
import { formatSubmissionDate } from './formatSubmissionDate';

describe('formatSubmissionDate', () => {
  it('should format a valid ISO date string to DD.MM.YYYY, HH:mm', () => {
    // Note: The formatSubmissionDate uses local time for getDate(), getMonth(), etc.
    // To make this test deterministic across timezones, we should either mock the Date
    // or parse a known date and compare it with the expected local output.
    // Let's create a date and format its local components to match the function logic.
    const dateStr = '2026-04-18T14:00:00Z';
    const date = new Date(dateStr);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const expected = `${day}.${month}.${year}, ${hours}:${minutes}`;

    const result = formatSubmissionDate(dateStr);
    expect(result).toBe(expected);
  });

  it('should return "—" for null input', () => {
    expect(formatSubmissionDate(null)).toBe('—');
  });

  it('should return "—" for undefined input', () => {
    expect(formatSubmissionDate(undefined)).toBe('—');
  });

  it('should return "—" for empty string', () => {
    expect(formatSubmissionDate('')).toBe('—');
  });

  it('should return "—" for invalid date string', () => {
    expect(formatSubmissionDate('invalid-date')).toBe('—');
  });
});
