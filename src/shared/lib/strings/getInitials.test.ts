import { describe, expect, it } from 'vitest';
import { getInitials } from './getInitials';

describe('getInitials', () => {
  it('should return "??" for empty string', () => {
    expect(getInitials('')).toBe('??');
    expect(getInitials('   ')).toBe('??');
  });

  it('should return the first letter of a single word', () => {
    expect(getInitials('User')).toBe('U');
    expect(getInitials('user')).toBe('U');
  });

  it('should return the first letters of two words', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('john doe')).toBe('JD');
  });

  it('should handle extra spaces between words', () => {
    expect(getInitials('  Alice   Bob  ')).toBe('AB');
  });

  it('should return only up to 2 initials if more words are provided', () => {
    expect(getInitials('John von Neumann')).toBe('JV');
  });

  it('should fallback to first two characters if single word has no spaces', () => {
    expect(getInitials('Alexander')).toBe('A');
  });
});
