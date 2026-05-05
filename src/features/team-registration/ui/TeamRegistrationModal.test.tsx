import { useQueryClient } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { teamRegistrationApi } from '../api/teamRegistrationApi';
import { TeamRegistrationModal } from './TeamRegistrationModal';

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(),
}));

vi.mock('../api/teamRegistrationApi', () => ({
  teamRegistrationApi: {
    createTeam: vi.fn(),
  },
}));

// Mock Shared UI components that might use portals or complex logic
vi.mock('@shared/ui', async () => {
  const actual = await vi.importActual('@shared/ui');
  return {
    ...actual,
    Modal: ({ children, isOpen, onClose }: any) =>
      isOpen ? (
        <div data-testid='modal'>
          <button onClick={onClose}>Close</button>
          {children}
        </div>
      ) : null,
  };
});

describe('TeamRegistrationModal Component', () => {
  const mockOnClose = vi.fn();
  const mockInvalidateQueries = vi.fn();
  const queryClient = { invalidateQueries: mockInvalidateQueries };

  beforeEach(() => {
    vi.clearAllMocks();
    (useQueryClient as any).mockReturnValue(queryClient);
  });

  it('should render when open', () => {
    render(<TeamRegistrationModal isOpen={true} onClose={mockOnClose} tournamentId={1} />);
    expect(screen.getByText('Реєстрація команди')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(<TeamRegistrationModal isOpen={true} onClose={mockOnClose} tournamentId={1} />);
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should submit form and close on success', async () => {
    vi.mocked(teamRegistrationApi.createTeam).mockResolvedValue({ id: 1 } as any);

    render(<TeamRegistrationModal isOpen={true} onClose={mockOnClose} tournamentId={1} />);

    fireEvent.change(screen.getByLabelText(/Назва команди/i), { target: { value: 'My Team' } });
    fireEvent.click(screen.getByRole('button', { name: /Зареєструватися/i }));

    await waitFor(() => {
      expect(teamRegistrationApi.createTeam).toHaveBeenCalledWith({
        name: 'My Team',
        tournament: 1,
      });
      expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ['my-teams'] });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should show error message on API failure', async () => {
    vi.mocked(teamRegistrationApi.createTeam).mockRejectedValue({
      response: { data: { detail: 'Team name already exists' } },
    });

    render(<TeamRegistrationModal isOpen={true} onClose={mockOnClose} tournamentId={1} />);

    fireEvent.change(screen.getByLabelText(/Назва команди/i), {
      target: { value: 'Existing Team' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Зареєструватися/i }));

    await waitFor(() => {
      expect(screen.getByText('Team name already exists')).toBeInTheDocument();
    });
  });
});
