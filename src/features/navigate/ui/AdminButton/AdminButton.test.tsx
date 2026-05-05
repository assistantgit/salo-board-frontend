import { useUserRoles } from '@entities/tournament';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
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
    (useUserRoles as any).mockReturnValue({ rolesData: null, isLoading: true });
    const { container } = render(<AdminButton />);
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing if not an admin', () => {
    (useUserRoles as any).mockReturnValue({ rolesData: { admin: false }, isLoading: false });
    const { container } = render(<AdminButton />);
    expect(container.firstChild).toBeNull();
  });

  it('should render button if user is an admin', () => {
    (useUserRoles as any).mockReturnValue({ rolesData: { admin: true }, isLoading: false });
    render(<AdminButton />);
    expect(screen.getByText(/Адмінпанель/i)).toBeInTheDocument();
  });

  it('should navigate to admin overview when clicked', () => {
    const navigate = vi.fn();
    (useNavigate as any).mockReturnValue(navigate);
    (useUserRoles as any).mockReturnValue({ rolesData: { admin: true }, isLoading: false });

    render(<AdminButton />);
    fireEvent.click(screen.getByText(/Адмінпанель/i));

    expect(navigate).toHaveBeenCalledWith('/admin/overview');
  });
});
