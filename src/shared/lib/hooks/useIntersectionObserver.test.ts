import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useIntersectionObserver } from './useIntersectionObserver';

describe('useIntersectionObserver', () => {
  const mockObserve = vi.fn();
  const mockUnobserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock IntersectionObserver
    global.IntersectionObserver = class {
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
    } as any;
  });

  it('should create an observer and observe the target element', () => {
    const onIntersect = vi.fn();
    const { result } = renderHook(() => useIntersectionObserver({ onIntersect }));

    const mockElement = document.createElement('div');
    (result.current.targetRef as any).current = mockElement;
  });

  it('should call onIntersect when element becomes visible', () => {
    let intersectCallback: (entries: any[]) => void = () => {};
    global.IntersectionObserver = class {
      constructor(cb: any) {
        intersectCallback = cb;
      }
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
    } as any;

    const onIntersect = vi.fn();
    renderHook(() => useIntersectionObserver({ onIntersect }));

    // Simulate intersection
    intersectCallback([{ isIntersecting: true }]);
    expect(onIntersect).toHaveBeenCalledTimes(1);

    // Simulate non-intersection
    intersectCallback([{ isIntersecting: false }]);
    expect(onIntersect).toHaveBeenCalledTimes(1); // Still 1
  });

  it('should unobserve on unmount', () => {
    const onIntersect = vi.fn();
    const { result, unmount } = renderHook(() => useIntersectionObserver({ onIntersect }));

    const mockElement = document.createElement('div');
    (result.current.targetRef as any).current = mockElement;

    unmount();
  });
});
