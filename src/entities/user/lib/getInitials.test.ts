import { describe, expect, it } from 'vitest';
import { getInitials } from './getInitials';

describe('getInitials', () => {
  it('should return initials for a full name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('should return initials for a name with three parts', () => {
    expect(getInitials('John Michael Doe')).toBe('JM');
  });

  it('should return a single initial for a single name', () => {
    expect(getInitials('John')).toBe('J');
  });

  it('should handle multiple spaces', () => {
    expect(getInitials('  John   Doe  ')).toBe('JD');
  });

  it('should return "?" for an empty string', () => {
    expect(getInitials('')).toBe('?');
  });

  it('should return "?" for a string with only spaces', () => {
    expect(getInitials('   ')).toBe('?');
  });

  it('should handle non-latin characters', () => {
    expect(getInitials('Іван Франко')).toBe('ІФ');
  });
});
