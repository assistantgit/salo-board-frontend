import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TournamentProgressBar } from './TournamentProgressBar';

describe('TournamentProgressBar Component', () => {
  it('should render with correct progress width', () => {
    const { container } = render(<TournamentProgressBar progress={45} status='RN' />);
    const fill = container.querySelector('[style*="width: 45%"]');
    expect(fill).toBeInTheDocument();
  });

  it('should show label by default', () => {
    render(<TournamentProgressBar progress={10} status='RG' />);
    expect(screen.getByText('Виконання турніру')).toBeInTheDocument();
  });

  it('should hide label when showLabel is false', () => {
    render(<TournamentProgressBar progress={10} status='RG' showLabel={false} />);
    expect(screen.queryByText('Виконання турніру')).not.toBeInTheDocument();
  });

  it('should apply status-specific class to fill', () => {
    const { container } = render(<TournamentProgressBar progress={50} status='FN' />);
    const fill = container.querySelector('[class*="fn"]');
    expect(fill).toBeInTheDocument();
  });
});
