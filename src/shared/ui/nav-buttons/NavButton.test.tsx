import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavButton } from './NavButton';

describe('NavButton Component', () => {
  it('should render as an IconButton with specific styles', () => {
    render(<NavButton icon={<span>icon</span>}>Navigation</NavButton>);

    expect(screen.getByText('Navigation')).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toHaveClass(/nav-btn/);
  });
});
