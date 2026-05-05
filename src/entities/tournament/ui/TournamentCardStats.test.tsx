import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TournamentCardStats } from './TournamentCardStats';

describe('TournamentCardStats Component', () => {
  const mockProps = {
    dateLabel: 'Початок',
    dateValue: '12.05.2024',
    teamsCount: 24,
    roundsCount: 4,
  };

  it('should render all stats correctly', () => {
    render(<TournamentCardStats {...mockProps} />);
    expect(screen.getByText('Початок')).toBeInTheDocument();
    expect(screen.getByText('12.05.2024')).toBeInTheDocument();
    expect(screen.getByText('24 команд')).toBeInTheDocument();
    expect(screen.getByText('4 Завдань')).toBeInTheDocument();
  });

  it('should render dash for null teamsCount', () => {
    render(<TournamentCardStats {...mockProps} teamsCount={null} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
