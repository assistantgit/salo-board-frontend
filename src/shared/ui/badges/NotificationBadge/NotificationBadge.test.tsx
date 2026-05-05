import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NotificationBadge } from './NotificationBadge';

describe('NotificationBadge Component', () => {
  it('should render default text for tournament type', () => {
    render(<NotificationBadge type='tournament' />);
    expect(screen.getByText('Турнір')).toBeInTheDocument();
  });

  it('should render default text for invitation type', () => {
    render(<NotificationBadge type='invitation' />);
    expect(screen.getByText('Запрошення')).toBeInTheDocument();
  });

  it('should render children if provided', () => {
    render(<NotificationBadge type='tournament'>Custom</NotificationBadge>);
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('should not render anything if type is none', () => {
    const { container } = render(<NotificationBadge type='none' />);
    expect(container.firstChild).toBeNull();
  });
});
