import { useAuthStore } from '@entities/user';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

// Mock the auth store
vi.mock('@entities/user', () => ({
  useAuthStore: vi.fn(),
}));

// Mock child components to avoid their complex dependencies (like useQuery)
vi.mock('./AuthHeader', () => ({
  AuthHeader: () => <div data-testid='auth-header' />,
}));

vi.mock('./GuestHeader', () => ({
  GuestHeader: () => <div data-testid='guest-header' />,
}));

describe('Header Widget', () => {
  it('should render GuestHeader when user is not authenticated', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuth: false,
      isAuthInProgress: false,
    } as any);

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('guest-header')).toBeInTheDocument();
  });

  it('should render AuthHeader when user is authenticated', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuth: true,
      isAuthInProgress: false,
    } as any);

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('auth-header')).toBeInTheDocument();
  });

  it('should render nothing while auth is in progress', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuth: false,
      isAuthInProgress: true,
    } as any);

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Inner div should be empty (or only have the header/inner structure but no Auth/Guest header)
    expect(screen.queryByTestId('auth-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('guest-header')).not.toBeInTheDocument();
  });
});
