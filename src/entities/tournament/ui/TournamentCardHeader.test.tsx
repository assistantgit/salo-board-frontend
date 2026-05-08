import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TournamentCardHeader } from './TournamentCardHeader';

describe('TournamentCardHeader Component', () => {
  const mockProps = {
    title: 'Winter Cup',
    organizer: 'Salo Board Team',
    status: 'RG' as const,
    statusLabel: 'Реєстрація',
  };

  it('should render title and organizer', () => {
    render(<TournamentCardHeader {...mockProps} />);
    expect(screen.getByText('Winter Cup')).toBeInTheDocument();
    expect(screen.getByText(/Salo Board Team/)).toBeInTheDocument();
  });

  it('should render status label', () => {
    render(<TournamentCardHeader {...mockProps} />);
    expect(screen.getByText('Реєстрація')).toBeInTheDocument();
  });

  it('should apply status class when withBackground is true', () => {
    const { container } = render(<TournamentCardHeader {...mockProps} withBackground={true} />);
    // The class will be something like _rg_hashed, so regex match is correct
    expect(container.firstChild).toHaveClass(/rg/);
  });
});
