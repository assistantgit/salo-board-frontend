import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavIconButton } from './NavIconButton';

describe('NavIconButton Component', () => {
  it('should render only the icon with specific nav-icon-btn class', () => {
    render(<NavIconButton icon={<span data-testid="icon">i</span>} />);
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toHaveClass(/nav-icon-btn/);
  });
});
