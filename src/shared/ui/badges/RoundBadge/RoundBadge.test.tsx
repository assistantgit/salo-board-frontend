import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RoundBadge } from './RoundBadge';

describe('RoundBadge Component', () => {
  it('should render order index with hash', () => {
    render(<RoundBadge orderIndex={5} />);
    expect(screen.getByText('#5')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<RoundBadge orderIndex={1} className='custom-badge' />);
    expect(container.firstChild).toHaveClass('custom-badge');
  });
});
