import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { TournamentArchiveButton } from './TournamentArchiveButton';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('TournamentArchiveButton Component', () => {
  it('should render correctly', () => {
    render(<TournamentArchiveButton />);
    expect(screen.getByText(/Архів/i)).toBeInTheDocument();
  });

  it('should navigate to /tournaments/archive when clicked', () => {
    const navigate = vi.fn();
    (useNavigate as any).mockReturnValue(navigate);

    render(<TournamentArchiveButton />);
    fireEvent.click(screen.getByText(/Архів/i));

    expect(navigate).toHaveBeenCalledWith('/tournaments/archive');
  });
});
