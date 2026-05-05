import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { NavigateBackButton } from './NavigateBackButton';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('NavigateBackButton Component', () => {
  it('should render correctly with label', () => {
    render(<NavigateBackButton label='Go Back' />);
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('should call navigate(-1) when clicked if onBack is not provided', () => {
    const navigate = vi.fn();
    (useNavigate as any).mockReturnValue(navigate);

    render(<NavigateBackButton />);
    fireEvent.click(screen.getByRole('button'));

    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it('should call onBack when clicked if provided', () => {
    const onBack = vi.fn();
    render(<NavigateBackButton onBack={onBack} />);
    fireEvent.click(screen.getByRole('button'));

    expect(onBack).toHaveBeenCalled();
  });
});
