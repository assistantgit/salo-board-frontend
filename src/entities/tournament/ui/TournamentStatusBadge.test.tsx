import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TournamentStatusBadge } from './TournamentStatusBadge';

describe('TournamentStatusBadge Component', () => {
  it('should render correct label for Draft status', () => {
    render(<TournamentStatusBadge status='DR' />);
    expect(screen.getByText('ЧЕРНЕТКА')).toBeInTheDocument();
  });

  it('should render correct label for Registration status', () => {
    render(<TournamentStatusBadge status='RG' />);
    expect(screen.getByText('РЕЄСТРАЦІЯ')).toBeInTheDocument();
  });

  it('should render correct label for Running status', () => {
    render(<TournamentStatusBadge status='RN' />);
    expect(screen.getByText('ТРИВАЄ')).toBeInTheDocument();
  });

  it('should render correct label for Finished status', () => {
    render(<TournamentStatusBadge status='FN' />);
    expect(screen.getByText('ЗАВЕРШЕНО')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<TournamentStatusBadge status='RN' className='custom-class' />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
