import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InfoCard } from './InfoCard';

describe('InfoCard Component', () => {
  const mockIcon = <span data-testid="card-icon">Icon</span>;

  it('should render label and value', () => {
    render(<InfoCard label="Total" value={100} icon={mockIcon} />);
    
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByTestId('card-icon')).toBeInTheDocument();
  });

  it('should render fallback dash for empty value', () => {
    render(<InfoCard label="Empty" icon={mockIcon} value={undefined} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('should render subtitle when provided', () => {
    render(<InfoCard label="L" value="V" icon={mockIcon} subtitle="Sub text" />);
    expect(screen.getByText('Sub text')).toBeInTheDocument();
  });

  it('should apply variant class correctly', () => {
    const { container } = render(<InfoCard variant="primary" icon={mockIcon} />);
    // CSS modules check
    expect(container.firstChild).toHaveClass(/card--primary/);
  });

  it('should apply custom className', () => {
    const { container } = render(<InfoCard className="test-class" icon={mockIcon} />);
    expect(container.firstChild).toHaveClass('test-class');
  });
});
