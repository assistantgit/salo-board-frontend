import { useAuthStore } from '@entities/user';
import { authApi } from '@features/auth';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { LogoutButton } from './LogoutButton';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@features/auth', () => ({
  authApi: {
    logout: vi.fn(),
  },
}));

vi.mock('@entities/user', () => ({
  useAuthStore: vi.fn(),
}));

describe('LogoutButton Component', () => {
  it('should render correctly', () => {
    (useAuthStore as any).mockReturnValue({ clearUser: vi.fn() });
    render(<LogoutButton />);
    expect(screen.getByLabelText(/Вийти/i)).toBeInTheDocument();
  });

  it('should call logout API and navigate to /login when clicked', async () => {
    const navigate = vi.fn();
    const clearUser = vi.fn();
    const onLogout = vi.fn();
    (useNavigate as any).mockReturnValue(navigate);
    (useAuthStore as any).mockReturnValue({ clearUser });

    render(<LogoutButton onLogout={onLogout} />);
    fireEvent.click(screen.getByLabelText(/Вийти/i));

    await waitFor(() => {
      expect(authApi.logout).toHaveBeenCalled();
      expect(clearUser).toHaveBeenCalled();
      expect(onLogout).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith('/login');
    });
  });
});
