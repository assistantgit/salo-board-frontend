import { describe, expect, it } from 'vitest';
import { getTeamColor, getTeamInitials } from './teamAvatar';

describe('teamAvatar utils', () => {
  describe('getTeamColor', () => {
    it('should return a color from the palette', () => {
      const color = getTeamColor('Alpha Team');
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('should return consistent colors for the same name', () => {
      expect(getTeamColor('Team A')).toBe(getTeamColor('Team A'));
    });

    it('should return different colors for different names', () => {
      expect(getTeamColor('Team A')).not.toBe(getTeamColor('Team B'));
    });
  });

  describe('getTeamInitials', () => {
    it('should return 2 letters for single word names', () => {
      expect(getTeamInitials('Alpha')).toBe('AL');
    });

    it('should return initials for multi-word names', () => {
      expect(getTeamInitials('Alpha Beta')).toBe('AB');
      expect(getTeamInitials('Delta Force Team')).toBe('DF');
    });

    it('should handle strings with multiple spaces', () => {
      expect(getTeamInitials('  Space   Force  ')).toBe('SF');
    });
  });
});
