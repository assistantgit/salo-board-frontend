import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IconButton } from './IconButton';

describe('IconButton Component', () => {
  it('should render children and icon', () => {
    render(
      <IconButton icon={<span data-testid="test-icon">icon</span>}>
        Click me
      </IconButton>
    );

    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should render icon on the left by default', () => {
    render(
      <IconButton icon={<span data-testid="test-icon">icon</span>}>
        Text
      </IconButton>
    );

    const button = screen.getByRole('button');
    // Basic check for order: icon then text
    expect(button.firstChild).toHaveAttribute('data-testid', 'test-icon');
  });

  it('should render icon on the right when iconPosition is "right"', () => {
    render(
      <IconButton icon={<span data-testid="test-icon">icon</span>} iconPosition="right">
        Text
      </IconButton>
    );

    const button = screen.getByRole('button');
    // Basic check for order: text then icon
    expect(button.lastChild).toHaveAttribute('data-testid', 'test-icon');
  });

  it('should pass through HTML button props', () => {
    render(
      <IconButton icon={<span>i</span>} disabled data-custom="test">
        Button
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-custom', 'test');
  });
});
