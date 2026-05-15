import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TournamentCardStats } from './TournamentCardStats';

describe('TournamentCardStats Component', () => {
  const mockProps = {
    dateLabel: 'Початок',
    dateValue: '12.05.2024',
    regRange: '10 трав. - 15 трав.',
    durationRange: '15 трав. - 20 трав.',
  };

  it('should render all stats correctly', () => {
    render(<TournamentCardStats {...mockProps} />);
    expect(screen.getByText('Початок')).toBeInTheDocument();
    expect(screen.getByText('12.05.2024')).toBeInTheDocument();
    expect(screen.getByText('10 трав. - 15 трав.')).toBeInTheDocument();
    expect(screen.getByText('15 трав. - 20 трав.')).toBeInTheDocument();
  });
});
