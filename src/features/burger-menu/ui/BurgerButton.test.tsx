import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BurgerButton } from './BurgerButton';

describe('BurgerButton Component', () => {
  it('should render correctly', () => {
    render(<BurgerButton isOpen={false} onClick={vi.fn()} />);
    expect(screen.getByLabelText(/Відкрити меню/i)).toBeInTheDocument();
  });

  it('should have aria-expanded false when closed', () => {
    render(<BurgerButton isOpen={false} onClick={vi.fn()} />);
    expect(screen.getByLabelText(/Відкрити меню/i)).toHaveAttribute('aria-expanded', 'false');
  });

  it('should have aria-expanded true when open', () => {
    render(<BurgerButton isOpen={true} onClick={vi.fn()} />);
    expect(screen.getByLabelText(/Відкрити меню/i)).toHaveAttribute('aria-expanded', 'true');
  });

  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    render(<BurgerButton isOpen={false} onClick={onClick} />);
    fireEvent.click(screen.getByLabelText(/Відкрити меню/i));
    expect(onClick).toHaveBeenCalled();
  });
});
