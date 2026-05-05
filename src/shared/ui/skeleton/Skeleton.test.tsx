import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton Component', () => {
  it('should render base skeleton with custom styles', () => {
    const { container } = render(<Skeleton width="100px" height="20px" borderRadius="4px" />);
    const el = container.firstChild as HTMLElement;
    
    expect(el).toHaveClass('skeleton');
    expect(el.style.width).toBe('100px');
    expect(el.style.height).toBe('20px');
    expect(el.style.borderRadius).toBe('4px');
  });

  it('should render Skeleton.Text with multiple lines', () => {
    const { container } = render(<Skeleton.Text lines={3} />);
    const lines = container.querySelectorAll('.skeleton-text-line');
    expect(lines).toHaveLength(3);
    // Last line should be shorter (60% by default)
    expect((lines[2] as HTMLElement).style.width).toBe('60%');
  });

  it('should render Skeleton.Circle', () => {
    const { container } = render(<Skeleton.Circle size={50} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('skeleton-circle');
    expect(el.style.borderRadius).toBe('50%');
  });

  it('should apply sync class when inside Provider', () => {
    const { container } = render(
      <Skeleton.Provider>
        <Skeleton />
      </Skeleton.Provider>
    );
    expect(container.querySelector('.skeleton')).toHaveClass('sync');
  });
});
