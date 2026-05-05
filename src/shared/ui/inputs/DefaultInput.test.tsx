import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DefaultInput } from './DefaultInput';

describe('DefaultInput Component', () => {
  it('should render input element', () => {
    render(<DefaultInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should handle onChange event', () => {
    const handleChange = vi.fn();
    render(<DefaultInput onChange={handleChange} />);
    
    const inputEl = screen.getByRole('textbox');
    fireEvent.change(inputEl, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    render(<DefaultInput className="custom-input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('default-input');
    expect(input).toHaveClass('custom-input');
  });

  it('should pass through HTML attributes', () => {
    render(<DefaultInput type="password" required data-testid="pwd-input" />);
    const input = screen.getByTestId('pwd-input');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toBeRequired();
  });
});
