import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ParticipantStatusRow } from './ParticipantStatusRow';

const MockIcon = ({ size }: { size?: string }) => <div data-testid='mock-icon'>{size}</div>;

describe('ParticipantStatusRow Component', () => {
  const mockProps = {
    title: 'Round 1',
    subtitle: 'Submission Status',
    icon: MockIcon,
  };

  it('should render title and subtitle', () => {
    render(<ParticipantStatusRow {...mockProps} />);
    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getByText('Submission Status')).toBeInTheDocument();
  });

  it('should render icon with correct size', () => {
    render(<ParticipantStatusRow {...mockProps} />);
    expect(screen.getByText('lg')).toBeInTheDocument();
  });

  it('should render rightSlot if provided', () => {
    render(
      <ParticipantStatusRow {...mockProps} rightSlot={<div data-testid='right-slot'>Badge</div>} />,
    );
    expect(screen.getByTestId('right-slot')).toBeInTheDocument();
  });

  it('should call onClick when clickable', () => {
    const onClick = vi.fn();
    render(<ParticipantStatusRow {...mockProps} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should be disabled if no onClick provided', () => {
    render(<ParticipantStatusRow {...mockProps} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
