import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Drawer } from './Drawer';

describe('Drawer Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render children when isOpen is true', () => {
    render(
      <Drawer isOpen={true}>
        <div data-testid='drawer-content'>Drawer Content</div>
      </Drawer>,
    );
    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
  });

  it('should call onClose when clicking overlay or handle', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose}>
        Content
      </Drawer>,
    );

    const overlay = screen.getAllByLabelText('Закрити')[0];
    fireEvent.click(overlay);

    act(() => {
      vi.advanceTimersByTime(350);
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose when pressing Escape', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose}>
        Content
      </Drawer>,
    );

    fireEvent.keyDown(window, { key: 'Escape' });

    act(() => {
      vi.advanceTimersByTime(350);
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('should handle lazy mounting', () => {
    const { queryByTestId, rerender } = render(
      <Drawer isOpen={false} lazy>
        <div data-testid='lazy-drawer'>Lazy</div>
      </Drawer>,
    );
    expect(queryByTestId('lazy-drawer')).not.toBeInTheDocument();

    rerender(
      <Drawer isOpen={true} lazy>
        <div data-testid='lazy-drawer'>Lazy</div>
      </Drawer>,
    );
    expect(screen.getByTestId('lazy-drawer')).toBeInTheDocument();
  });
});
