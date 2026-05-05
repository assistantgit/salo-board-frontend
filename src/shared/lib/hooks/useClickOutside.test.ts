import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  it('should call handler when clicking outside the ref', () => {
    const handler = vi.fn();
    const ref = { current: document.createElement('div') };
    
    // Add the ref element to the document body so we can simulate clicks outside
    document.body.appendChild(ref.current);

    renderHook(() => useClickOutside(ref, handler));

    // Simulate click on the document body (outside the ref element)
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(handler).toHaveBeenCalledTimes(1);
    
    document.body.removeChild(ref.current);
  });

  it('should not call handler when clicking inside the ref', () => {
    const handler = vi.fn();
    const ref = { current: document.createElement('div') };
    
    renderHook(() => useClickOutside(ref, handler));

    // Simulate click on the ref element
    ref.current.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
  });
});
