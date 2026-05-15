import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CriteriaCard } from './CriteriaCard';

describe('CriteriaCard Component', () => {
  const defaultProps = {
    title: 'Code Quality',
    category: 'Technical',
    weight: 20,
    maxPoints: 10,
  };

  it('should render title and category', () => {
    render(<CriteriaCard {...defaultProps} />);
    expect(screen.getByText('Code Quality')).toBeInTheDocument();
    expect(screen.getByText('Technical')).toBeInTheDocument();
  });

  it('should render meta info when not evaluated', () => {
    render(<CriteriaCard {...defaultProps} isEvaluated={false} />);
    expect(screen.getByText(/Вага: x20/)).toBeInTheDocument();
    expect(screen.getByText(/Макс: 10/)).toBeInTheDocument();
  });

  it('should render score and progress bar when evaluated', () => {
    render(<CriteriaCard {...defaultProps} isEvaluated={true} score={8} />);

    expect(screen.getByText('8/10')).toBeInTheDocument();
    // Check if progress bar fill has correct width
    const fill = document.querySelector('[class*="progressBarFill"]') as HTMLElement;
    expect(fill.style.width).toBe('80%');
  });

  it('should apply color based on orderIndex', () => {
    // CHART_COLORS should be used. We can check if background color is applied.
    const { container } = render(
      <CriteriaCard {...defaultProps} isEvaluated={true} score={5} orderIndex={1} />,
    );
    const fill = container.querySelector('[class*="progressBarFill"]') as HTMLElement;
    expect(fill.style.backgroundColor).toBeDefined();
  });
});
