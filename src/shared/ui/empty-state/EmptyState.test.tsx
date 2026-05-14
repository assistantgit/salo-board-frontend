import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState Component', () => {
  it('should render title', () => {
    render(<EmptyState title='No data found' />);
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('should render subtitle when provided', () => {
    render(<EmptyState title='Title' subtitle='Try another search' />);
    expect(screen.getByText('Try another search')).toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    render(<EmptyState title='Title' icon={<span data-testid='test-icon'>icon</span>} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should render action when provided', () => {
    render(<EmptyState title='Title' action={<button type='button'>Action</button>} />);
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<EmptyState title='Title' className='custom-empty' />);
    expect(container.firstChild).toHaveClass('custom-empty');
  });
});
