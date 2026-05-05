import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TournamentListRow } from './TournamentListRow';

const MockIcon = ({ size }: { size?: string }) => <div data-testid='mock-icon'>{size}</div>;

describe('TournamentListRow Component', () => {
  it('should render title and teams count', () => {
    render(<TournamentListRow title='Test Tournament' teamsCount={10} icon={MockIcon} />);
    expect(screen.getByText('Test Tournament')).toBeInTheDocument();
    expect(screen.getByText('10 команд')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    render(<TournamentListRow title='Clickable' icon={MockIcon} onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should be disabled if no onClick provided', () => {
    render(<TournamentListRow title='Static' icon={MockIcon} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
