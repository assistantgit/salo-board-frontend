import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DefaultButton } from './DefaultButton';

describe('DefaultButton Component', () => {
  it('should render children', () => {
    render(<DefaultButton>Click me</DefaultButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle onClick event', () => {
    const handleClick = vi.fn();
    render(<DefaultButton onClick={handleClick}>Button</DefaultButton>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    const { container } = render(<DefaultButton className="custom-btn" />);
    expect(container.firstChild).toHaveClass('custom-btn');
  });
});
