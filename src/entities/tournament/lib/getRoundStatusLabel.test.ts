import { describe, expect, it } from 'vitest';
import { getRoundStatusLabel } from './getRoundStatusLabel';

describe('getRoundStatusLabel', () => {
  it('should return "Очікується" for DR status', () => {
    expect(getRoundStatusLabel('DR')).toBe('Очікується');
  });

  it('should return "Активний" for AC status', () => {
    expect(getRoundStatusLabel('AC')).toBe('Активний');
  });

  it('should return "Оцінюється" for SC status', () => {
    expect(getRoundStatusLabel('SC')).toBe('Оцінюється');
  });

  it('should return "Оцінений" for EV status', () => {
    expect(getRoundStatusLabel('EV')).toBe('Оцінений');
  });

  it('should return empty string for unknown status', () => {
    expect(getRoundStatusLabel('UNKNOWN')).toBe('');
  });
});
