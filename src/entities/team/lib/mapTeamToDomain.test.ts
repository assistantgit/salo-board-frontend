import { describe, expect, it } from 'vitest';
import type { TeamDto } from '../model/team.types';
import { mapTeamToDomain } from './mapTeamToDomain';

describe('mapTeamToDomain', () => {
  it('should map TeamDto with numeric tournament ID', () => {
    const dto: TeamDto = {
      id: 1,
      name: 'Alpha Team',
      status: 'RG',
      tournament: 101,
    };
    const domain = mapTeamToDomain(dto);
    expect(domain.id).toBe(1);
    expect(domain.name).toBe('Alpha Team');
    expect(domain.tournamentId).toBe(101);
    expect(domain.initials).toBe('AT');
  });

  it('should map TeamDto with object tournament', () => {
    const dto: TeamDto = {
      id: 2,
      name: 'Beta',
      status: 'RG',
      tournament: { id: 202 },
    };
    const domain = mapTeamToDomain(dto);
    expect(domain.tournamentId).toBe(202);
    expect(domain.initials).toBe('BE'); // single word name takes first 2 letters
  });

  it('should handle single word names for initials', () => {
    const dto: TeamDto = {
      id: 3,
      name: 'Gamma',
      status: 'RG',
      tournament: 101,
    };
    const domain = mapTeamToDomain(dto);
    expect(domain.initials).toBe('GA');
  });

  it('should handle multi-word names for initials', () => {
    const dto: TeamDto = {
      id: 4,
      name: 'Delta Force Team',
      status: 'RG',
      tournament: 101,
    };
    const domain = mapTeamToDomain(dto);
    expect(domain.initials).toBe('DF');
  });
});
