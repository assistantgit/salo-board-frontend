import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AuthFooter } from './AuthFooter';

describe('AuthFooter Component', () => {
  it('should render text and link', () => {
    render(<AuthFooter text="Don't have an account?" linkText='Sign up' linkHref='/register' />);

    expect(screen.getByText(/Don't have an account\?/)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Sign up/i });
    expect(link).toHaveAttribute('href', '/register');
  });
});
