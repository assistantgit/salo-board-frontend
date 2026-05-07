import { describe, expect, it } from 'vitest';
import { resolveSize } from './resolve-size';

describe('resolveSize', () => {
  it('should resolve preset sizes', () => {
    expect(resolveSize('xs')).toBe('0.875rem');
    expect(resolveSize('sm')).toBe('1.125rem');
    expect(resolveSize('md')).toBe('1.375rem');
  });

  it('should return number with rem for custom numeric sizes', () => {
    expect(resolveSize(2)).toBe('2rem');
    expect(resolveSize(0.5)).toBe('0.5rem');
  });
});
