import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { TournamentDomain } from '../model/tournament.types';
import { TournamentListBase } from './TournamentListBase';

// Mock getTournamentMeta
vi.mock('../lib/getTournamentMeta', () => ({
  getTournamentMeta: vi.fn(() => ({
    dateLabel: 'Date Label',
    dateValue: 'Date Value',
    progress: 50,
  })),
}));

describe('TournamentListBase', () => {
  const mockTournaments: TournamentDomain[] = [
    {
      id: 1,
      title: 'Tournament 1',
      organizer: 'Organizer 1',
      status: 'RN',
      startDate: new Date(),
      endedAt: new Date(),
      teamsCount: 10,
      roundsCount: 5,
      description: 'Description 1',
      rules: 'Rules 1',
      regOpenAt: new Date(),
      regCloseAt: new Date(),
    },
    {
      id: 2,
      title: 'Tournament 2',
      organizer: 'Organizer 2',
      status: 'RG',
      startDate: new Date(),
      endedAt: new Date(),
      teamsCount: 20,
      roundsCount: 8,
      description: 'Description 2',
      rules: 'Rules 2',
      regOpenAt: new Date(),
      regCloseAt: new Date(),
    },
  ];

  const renderCta = (t: TournamentDomain) => <button type='button'>CTA {t.id}</button>;

  it('should render loading skeleton when isLoading is true', () => {
    render(
      <TournamentListBase tournaments={[]} isLoading={true} error={null} renderCta={renderCta} />,
    );

    // Check if multiple skeletons are rendered
    const skeletons = screen.getAllByTestId('tournament-card-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render error message when error is provided', () => {
    render(
      <TournamentListBase
        tournaments={[]}
        isLoading={false}
        error='Something went wrong'
        renderCta={renderCta}
      />,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should render empty message when no tournaments are provided', () => {
    render(
      <TournamentListBase
        tournaments={[]}
        isLoading={false}
        error={null}
        renderCta={renderCta}
        emptyMessage='No tournaments here'
      />,
    );

    expect(screen.getByText('No tournaments here')).toBeInTheDocument();
  });

  it('should render list of tournament cards', () => {
    render(
      <TournamentListBase
        tournaments={mockTournaments}
        isLoading={false}
        error={null}
        renderCta={renderCta}
      />,
    );

    expect(screen.getByText('Tournament 1')).toBeInTheDocument();
    expect(screen.getByText('Tournament 2')).toBeInTheDocument();
    expect(screen.getByText('CTA 1')).toBeInTheDocument();
    expect(screen.getByText('CTA 2')).toBeInTheDocument();
  });
});
