import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TimelineNode } from './TimelineNode';

describe('TimelineNode Component', () => {
  it('should render label and subLabel', () => {
    render(<TimelineNode label="Step 1" subLabel="In progress" />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });

  it('should apply status class', () => {
    const { container } = render(<TimelineNode status="active" />);
    expect(container.firstChild).toHaveClass(/active/);
  });

  it('should apply custom className', () => {
    const { container } = render(<TimelineNode className="custom-node" />);
    expect(container.firstChild).toHaveClass('custom-node');
  });
});
