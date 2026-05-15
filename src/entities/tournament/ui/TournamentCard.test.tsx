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
    regRange: '10 трав. - 15 трав.',
    durationRange: '15 трав. - 20 трав.',
    progress: 50,
    ctaSlot: <button type='button'>Join</button>,
  };

  it('should render tournament details correctly', () => {
    render(<TournamentCard {...mockProps} />);

    expect(screen.getByText('Autumn Cup 2024')).toBeInTheDocument();
    expect(screen.getByText(/Salo Association/i)).toBeInTheDocument();
    expect(screen.getByText('У процесі')).toBeInTheDocument(); // Header status label
    expect(screen.getByText('10 трав. - 15 трав.')).toBeInTheDocument(); // Reg range
    expect(screen.getByText('15 трав. - 20 трав.')).toBeInTheDocument(); // Duration range
  });

  it('should render CTA slot content', () => {
    render(<TournamentCard {...mockProps} />);
    expect(screen.getByRole('button', { name: /Join/i })).toBeInTheDocument();
  });
});
