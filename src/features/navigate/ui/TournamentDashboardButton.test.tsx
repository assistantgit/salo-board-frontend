import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { TournamentDashboardButton } from './TournamentDashboardButton';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('TournamentDashboardButton Component', () => {
  it('should render correctly', () => {
    render(<TournamentDashboardButton />);
    expect(screen.getByText(/До головної/i)).toBeInTheDocument();
  });

  it('should navigate to / when clicked', () => {
    const navigate = vi.fn();
    (useNavigate as any).mockReturnValue(navigate);

    render(<TournamentDashboardButton />);
    fireEvent.click(screen.getByText(/До головної/i));

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
