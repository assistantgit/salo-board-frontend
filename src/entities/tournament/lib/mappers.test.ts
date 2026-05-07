import { describe, expect, it } from 'vitest';
import type { TournamentDto } from '../model/tournament.types';
import { mapTournamentToDomain } from './mappers';

describe('mapTournamentToDomain', () => {
  const mockDto: TournamentDto = {
    id: 1,
    title: 'Tournament 1',
    description: 'Description 1',
    rules: 'Rules 1',
    organizer: 'Organizer 1',
    status: 'RN',
    startDate: '2024-05-01T00:00:00Z',
    regOpenAt: '2024-04-01T00:00:00Z',
    regCloseAt: '2024-04-15T00:00:00Z',
    endedAt: '2024-05-10T00:00:00Z',
    isTeamVisible: true,
    teamsCount: 10,
    roundsCount: 5,
    minTeamSize: 1,
    maxTeamSize: 5,
    maxTeam: 20,
  };

  it('should correctly map TournamentDto to TournamentDomain', () => {
    const domain = mapTournamentToDomain(mockDto);

    expect(domain.id).toBe(1);
    expect(domain.title).toBe('Tournament 1');
    expect(domain.organizer).toBe('Organizer 1');
    expect(domain.startDate).toBeInstanceOf(Date);
    expect(domain.startDate.toISOString()).toBe('2024-05-01T00:00:00.000Z');
    expect(domain.teamsCount).toBe(10);
  });

  it('should use default values for missing fields', () => {
    const minimalDto: TournamentDto = {
      id: 2,
      title: 'Minimal Tournament',
      status: 'DR',
      startDate: '2024-06-01T00:00:00Z',
      regOpenAt: '2024-05-01T00:00:00Z',
      regCloseAt: '2024-05-15T00:00:00Z',
      endedAt: '2024-06-10T00:00:00Z',
      isTeamVisible: true,
      minTeamSize: 1,
      maxTeamSize: 5,
      maxTeam: 10,
      description: '',
      rules: '',
    };

    const domain = mapTournamentToDomain(minimalDto);

    expect(domain.organizer).toBe('SaloBoardTeam');
    expect(domain.teamsCount).toBe(0);
    expect(domain.roundsCount).toBe(0);
  });
});
