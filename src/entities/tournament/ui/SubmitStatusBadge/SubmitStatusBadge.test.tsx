import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SubmitStatusBadge } from './SubmitStatusBadge';

describe('SubmitStatusBadge Component', () => {
  it('should render correct label for DR', () => {
    render(<SubmitStatusBadge status='DR' />);
    expect(screen.getByText('Чернетка')).toBeInTheDocument();
  });

  it('should render correct label for SB', () => {
    render(<SubmitStatusBadge status='SB' />);
    expect(screen.getByText('Відправлено')).toBeInTheDocument();
  });

  it('should apply status-specific class', () => {
    const { container } = render(<SubmitStatusBadge status='LK' />);
    expect(container.firstChild).toHaveClass(/lk/);
  });
});
