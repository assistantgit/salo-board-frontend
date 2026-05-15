import { useUserRoles } from '@entities/tournament';
import { fireEvent, render, screen } from '@testing-library/react';
import { type NavigateFunction, useNavigate } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { AdminButton } from './AdminButton';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@entities/tournament', () => ({
  useUserRoles: vi.fn(),
}));

describe('AdminButton Component', () => {
  it('should render nothing while loading', () => {
    vi.mocked(useUserRoles).mockReturnValue({
      rolesData: null,
      isLoading: true,
      activeRoles: [],
      error: null,
    });
    const { container } = render(<AdminButton />);
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing if not an admin', () => {
    vi.mocked(useUserRoles).mockReturnValue({
      rolesData: { admin: false, participant: false, jury: false },
      isLoading: false,
      activeRoles: [],
      error: null,
    });
    const { container } = render(<AdminButton />);
    expect(container.firstChild).toBeNull();
  });

  it('should render button if user is an admin', () => {
    vi.mocked(useUserRoles).mockReturnValue({
      rolesData: { admin: true, participant: false, jury: false },
      isLoading: false,
      activeRoles: ['admin'],
      error: null,
    });
    render(<AdminButton />);
    expect(screen.getByText(/Адмінпанель/i)).toBeInTheDocument();
  });

  it('should navigate to admin overview when clicked', () => {
    const navigate = vi.fn() as unknown as NavigateFunction;
    vi.mocked(useNavigate).mockReturnValue(navigate);
    vi.mocked(useUserRoles).mockReturnValue({
      rolesData: { admin: true, participant: false, jury: false },
      isLoading: false,
      activeRoles: ['admin'],
      error: null,
    });

    render(<AdminButton />);
    fireEvent.click(screen.getByText(/Адмінпанель/i));

    expect(navigate).toHaveBeenCalledWith('/admin/overview');
  });
});
