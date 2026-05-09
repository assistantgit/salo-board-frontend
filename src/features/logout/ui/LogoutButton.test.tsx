import { type AuthState, useAuthStore } from '@entities/user';
import { authApi } from '@features/auth';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { type NavigateFunction, useNavigate } from 'react-router-dom';
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
    vi.mocked(useAuthStore).mockReturnValue({ clearUser: vi.fn() } as unknown as AuthState);
    render(<LogoutButton />);
    expect(screen.getByLabelText(/Вийти/i)).toBeInTheDocument();
  });

  it('should call logout API and navigate to /login when clicked', async () => {
    const navigate = vi.fn() as unknown as NavigateFunction;
    const clearUser = vi.fn();
    const onLogout = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);
    vi.mocked(useAuthStore).mockReturnValue({ clearUser } as unknown as AuthState);

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
