import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  it('should render input with placeholder', () => {
    render(<SearchBar placeholder="Find tournament..." />);
    expect(screen.getByPlaceholderText('Find tournament...')).toBeInTheDocument();
  });

  it('should handle onChange event', () => {
    const handleChange = vi.fn();
    render(<SearchBar onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should render skeleton when isLoading is true', () => {
    const { container } = render(<SearchBar isLoading={true} />);
    // Check for skeleton class
    expect(container.firstChild).toHaveClass(/skeleton/);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<SearchBar className="custom-search" />);
    expect(container.firstChild).toHaveClass('custom-search');
  });
});
