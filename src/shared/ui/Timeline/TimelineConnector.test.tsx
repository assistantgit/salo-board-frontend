import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TimelineConnector } from './TimelineConnector';

describe('TimelineConnector Component', () => {
  it('should render with draft status by default', () => {
    const { container } = render(<TimelineConnector />);
    expect(container.firstChild).toHaveClass(/connector/);
    // Draft doesn't add extra class in this implementation
  });

  it('should apply active/done status classes', () => {
    const { container, rerender } = render(<TimelineConnector status="active" />);
    expect(container.firstChild).toHaveClass(/active/);

    rerender(<TimelineConnector status="done" />);
    expect(container.firstChild).toHaveClass(/done/);
  });
});
