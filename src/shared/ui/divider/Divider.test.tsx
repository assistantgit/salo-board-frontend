import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Divider } from './Divider';

describe('Divider Component', () => {
  it('should render correctly with default styles', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveClass(/divider/);
  });

  it('should apply custom margin style', () => {
    const { container } = render(<Divider margin="20px 0" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.margin).toBe('20px 0px'); // browser might normalize
  });

  it('should apply custom className', () => {
    const { container } = render(<Divider className="test-divider" />);
    expect(container.firstChild).toHaveClass('test-divider');
  });
});
