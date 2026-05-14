import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge Component', () => {
  it('should render children', () => {
    render(<StatusBadge>Active</StatusBadge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should apply default variant class', () => {
    const { container } = render(<StatusBadge>Status</StatusBadge>);
    expect(container.firstChild).toHaveClass(/badge/);
    expect(container.firstChild).toHaveClass(/default/);
  });

  it('should apply specific variant class', () => {
    const { container } = render(<StatusBadge variant='green'>Success</StatusBadge>);
    expect(container.firstChild).toHaveClass(/green/);
  });

  it('should apply custom className', () => {
    const { container } = render(<StatusBadge className='custom-badge'>Text</StatusBadge>);
    expect(container.firstChild).toHaveClass('custom-badge');
  });

  it('should pass other HTML attributes', () => {
    render(<StatusBadge data-testid='badge-test'>Text</StatusBadge>);
    expect(screen.getByTestId('badge-test')).toBeInTheDocument();
  });
});
