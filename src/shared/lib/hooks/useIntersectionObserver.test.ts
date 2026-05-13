import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useIntersectionObserver } from './useIntersectionObserver';

describe('useIntersectionObserver', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create IntersectionObserver and observe element', () => {
    const onIntersect = vi.fn();
    const { result } = renderHook(() => useIntersectionObserver({ onIntersect }));

    // Mock ref element and trigger effect
    const div = document.createElement('div');
    // @ts-expect-error - simulating ref assignment
    result.current.targetRef.current = div;

    // Re-render to trigger useEffect with the ref
    const { rerender } = renderHook(() => useIntersectionObserver({ onIntersect }));
    // @ts-expect-error
    result.current.targetRef.current = div;
    rerender();

    expect(IntersectionObserver).toHaveBeenCalled();
  });

  it('should not observe if disabled', () => {
    const onIntersect = vi.fn();
    renderHook(() => useIntersectionObserver({ onIntersect, enabled: false }));

    expect(IntersectionObserver).not.toHaveBeenCalled();
  });
});
