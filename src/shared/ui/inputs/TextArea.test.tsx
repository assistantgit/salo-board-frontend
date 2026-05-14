import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TextArea } from './TextArea';

describe('TextArea Component', () => {
  it('should render correctly', () => {
    render(<TextArea placeholder='Enter text' />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toHaveClass('default-textarea');
  });

  it('should handle value changes', () => {
    const handleChange = vi.fn();
    render(<TextArea onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'New content' } });
    expect(handleChange).toHaveBeenCalled();
    expect(textarea).toHaveValue('New content');
  });

  it('should apply custom className', () => {
    render(<TextArea className='custom-textarea' />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-textarea');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<TextArea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
