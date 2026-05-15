import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RoundDates } from './RoundDates';

describe('RoundDates Component', () => {
  it('should render nothing if no dates are provided', () => {
    const { container } = render(<RoundDates />);
    expect(container.firstChild).toBeNull();
  });

  it('should render formatted dates correctly', () => {
    const startAt = '2024-05-01T10:00:00Z';
    const deadline = '2024-05-10T10:00:00Z';

    render(<RoundDates startAt={startAt} deadline={deadline} label='Термін:' />);

    expect(screen.getByText(/Термін:/i)).toBeInTheDocument();
    // Use regex to be more flexible with formatting variations
    expect(screen.getByText(/травня/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it('should apply variant class', () => {
    const { container } = render(<RoundDates startAt='2024-01-01' variant='solid' />);
    expect(container.firstChild).toHaveClass(/solid/);
  });
});
