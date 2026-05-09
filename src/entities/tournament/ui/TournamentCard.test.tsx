import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TournamentCard } from './TournamentCard';

describe('TournamentCard Component', () => {
  const mockProps = {
    id: 1,
    title: 'Autumn Cup 2024',
    organizer: 'Salo Association',
    status: 'RN' as const,
    dateLabel: 'Starts',
    dateValue: '20.10.2024',
    teamsCount: 12,
    roundsCount: 4,
    progress: 50,
    ctaSlot: <button type='button'>Join</button>,
  };

  it('should render tournament details correctly', () => {
    render(<TournamentCard {...mockProps} />);

    expect(screen.getByText('Autumn Cup 2024')).toBeInTheDocument();
    expect(screen.getByText(/Salo Association/i)).toBeInTheDocument();
    expect(screen.getByText('У процесі')).toBeInTheDocument(); // Header status label
    expect(screen.getByText(/12 команд/)).toBeInTheDocument(); // Teams count
    expect(screen.getByText(/4 Завдань/)).toBeInTheDocument(); // Rounds count
  });

  it('should render CTA slot content', () => {
    render(<TournamentCard {...mockProps} />);
    expect(screen.getByRole('button', { name: /Join/i })).toBeInTheDocument();
  });

  it('should handle null teams count', () => {
    render(<TournamentCard {...mockProps} teamsCount={null} />);
    expect(screen.getByText(/—/)).toBeInTheDocument();
  });
});
