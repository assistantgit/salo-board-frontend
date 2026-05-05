import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge Component', () => {
  it('should render children content', () => {
    render(<StatusBadge>Active</StatusBadge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should apply default neutral variant class', () => {
    const { container } = render(<StatusBadge>Status</StatusBadge>);
    // We check for the presence of a class that usually contains "neutral"
    // since CSS modules obfuscate class names but typically keep the variant name as a suffix or part of it
    // If not, we'd need to mock the styles object or check computed styles
    expect(container.firstChild).toHaveClass(/neutral/);
  });

  it('should apply specified variant class', () => {
    const { container } = render(<StatusBadge variant='success'>Success</StatusBadge>);
    expect(container.firstChild).toHaveClass(/success/);
  });

  it('should apply custom className', () => {
    const { container } = render(<StatusBadge className='custom-test'>Content</StatusBadge>);
    expect(container.firstChild).toHaveClass('custom-test');
  });
});
