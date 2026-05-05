import { describe, expect, it } from 'vitest';
import { formatUkDate } from './formatDate';

describe('formatUkDate', () => {
  it('should format a date correctly to Ukrainian locale', () => {
    // We mock the date to ensure consistent results regardless of the environment
    const date = new Date('2026-04-14T10:00:00Z');
    const result = formatUkDate(date);
    
    // The exact string format might vary by node version/OS slightly (e.g., '14 квіт.' vs '14 квітня' depending on browser/node version), 
    // but typically `short` month for uk-UA returns the abbreviated month. 
    // For test reliability, we can test if it contains the day and part of the month.
    expect(result).toMatch(/14\s+квіт/i);
  });
});
