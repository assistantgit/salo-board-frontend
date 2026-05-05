import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DeadlineBadge } from './DeadlineBadge';
import { formatDeadline } from '@shared/lib/date/formatDeadline';

vi.mock('@shared/lib/date/formatDeadline', () => ({
  formatDeadline: vi.fn(),
}));

describe('DeadlineBadge Component', () => {
  it('should render the formatted deadline text', () => {
    vi.mocked(formatDeadline).mockReturnValue('2 дн.');
    render(<DeadlineBadge deadline="2026-05-07" />);
    
    expect(screen.getByText('2 дн.')).toBeInTheDocument();
    expect(formatDeadline).toHaveBeenCalledWith('2026-05-07');
  });

  it('should apply custom className', () => {
    vi.mocked(formatDeadline).mockReturnValue('text');
    const { container } = render(<DeadlineBadge deadline="any" className="test-badge" />);
    expect(container.firstChild).toHaveClass('test-badge');
  });
});
