import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AuthErrorBanner } from './AuthErrorBanner';

describe('AuthErrorBanner Component', () => {
  it('should render message when provided', () => {
    render(<AuthErrorBanner message="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should not render anything if no message', () => {
    const { container } = render(<AuthErrorBanner message="" />);
    expect(container.firstChild).toBeNull();
  });
});
