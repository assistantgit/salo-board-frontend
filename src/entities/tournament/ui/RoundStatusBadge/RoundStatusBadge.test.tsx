import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RoundStatusBadge } from './RoundStatusBadge';

vi.mock('../../lib/getRoundStatusLabel', () => ({
  getRoundStatusLabel: vi.fn((status: string) => {
    const labels: Record<string, string> = {
      DR: 'Чернетка',
      AC: 'Активний',
      SC: 'Підрахунок',
      EV: 'Оцінювання',
    };
    return labels[status] ?? status;
  }),
}));

describe('RoundStatusBadge Component', () => {
  it('should render correct label for status', () => {
    render(<RoundStatusBadge status='AC' />);
    expect(screen.getByText('Активний')).toBeInTheDocument();
  });

  it('should apply status-specific class', () => {
    const { container } = render(<RoundStatusBadge status='SC' />);
    expect(container.firstChild).toHaveClass(/sc/);
  });
});
