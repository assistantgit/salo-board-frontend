import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  it('should not render if totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render navigation with correct active page', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />);
    
    expect(screen.getByLabelText('Pagination')).toBeInTheDocument();
    const activeDot = screen.getByLabelText('Page indicator 2');
    expect(activeDot).toHaveAttribute('aria-current', 'page');
  });

  it('should call onPageChange when clicking next/prev arrows', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('should disable arrows on first/last pages', () => {
    const { rerender } = render(<Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();

    rerender(<Pagination currentPage={3} totalPages={3} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
  });

  it('should handle dot click correctly', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);

    // Last dot should go to totalPages
    fireEvent.click(screen.getByLabelText('Page indicator 3'));
    expect(onPageChange).toHaveBeenCalledWith(10);
  });
});
