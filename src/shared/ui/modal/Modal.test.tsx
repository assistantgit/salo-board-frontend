import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { Modal } from './Modal';

describe('Modal Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render children when isOpen is true', () => {
    render(
      <Modal isOpen={true}>
        <div data-testid="modal-content">Content</div>
      </Modal>
    );

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('should not render anything when isOpen is false', () => {
    render(
      <Modal isOpen={false}>
        <div data-testid="modal-content">Content</div>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toHaveClass(/opened/);
  });

  it('should call onClose when clicking overlay', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>
    );

    const overlays = screen.getAllByLabelText('Закрити');
    fireEvent.click(overlays[0]); // First one is the overlay

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose when pressing Escape', () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose}>Content</Modal>);

    fireEvent.keyDown(window, { key: 'Escape' });
    
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    expect(onClose).toHaveBeenCalled();
  });

  it('should implement lazy mounting', () => {
    const { queryByTestId, rerender } = render(
      <Modal isOpen={false} lazy>
        <div data-testid="lazy-content">Lazy</div>
      </Modal>
    );

    expect(queryByTestId('lazy-content')).not.toBeInTheDocument();

    rerender(
      <Modal isOpen={true} lazy>
        <div data-testid="lazy-content">Lazy</div>
      </Modal>
    );

    expect(screen.getByTestId('lazy-content')).toBeInTheDocument();
  });
});
