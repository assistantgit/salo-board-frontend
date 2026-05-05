import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { LoginButton } from './LoginButton';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('LoginButton Component', () => {
  it('should render correctly', () => {
    render(<LoginButton />);
    expect(screen.getByLabelText(/Увійти в акаунт/i)).toBeInTheDocument();
  });

  it('should navigate to /login when clicked', () => {
    const navigate = vi.fn();
    (useNavigate as any).mockReturnValue(navigate);

    render(<LoginButton />);
    fireEvent.click(screen.getByLabelText(/Увійти в акаунт/i));

    expect(navigate).toHaveBeenCalledWith('/login');
  });

  it('should apply custom className', () => {
    render(<LoginButton className='custom-login' />);
    expect(screen.getByLabelText(/Увійти в акаунт/i)).toHaveClass('custom-login');
  });
});
