import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Toast } from './Toast';

describe('Toast Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should render message', () => {
    render(<Toast message='Success!' onClose={() => {}} />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('should call onClose after duration and animation delay', () => {
    const handleClose = vi.fn();
    render(<Toast message='Msg' duration={1000} onClose={handleClose} />);

    // Fast-forward 1000ms (duration)
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(handleClose).not.toHaveBeenCalled();

    // Fast-forward another 300ms (animation delay)
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should apply hidden class when timer expires', () => {
    render(<Toast message='Msg' duration={1000} onClose={() => {}} />);
    const toastElement = screen.getByText('Msg');

    expect(toastElement).toHaveClass(/visible/);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(toastElement).toHaveClass(/hidden/);
  });
});
