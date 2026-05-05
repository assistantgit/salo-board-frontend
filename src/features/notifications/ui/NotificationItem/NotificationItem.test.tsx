import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useNotificationStore } from '../../model/store';
import { NotificationItem } from './NotificationItem';

vi.mock('../../model/store', () => ({
  useNotificationStore: vi.fn(),
}));

vi.mock('@shared/lib/date', () => ({
  formatRelativeTime: vi.fn(() => '2 mins ago'),
}));

vi.mock('../NotificationAvatar/NotificationAvatar', () => ({
  NotificationAvatar: () => <div data-testid='avatar'>Avatar</div>,
}));

describe('NotificationItem Component', () => {
  const performAction = vi.fn();
  const mockNotification = {
    id: 1,
    type: 'JI' as const,
    title: 'New Invitation',
    message: 'You have been invited to a team',
    status: 'UR' as const,
    actionType: 'YN' as const,
    createdAt: '2024-05-05T10:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useNotificationStore as any).mockReturnValue({ performAction });
  });

  it('should render notification content', () => {
    render(<NotificationItem notification={mockNotification as any} />);
    expect(screen.getByText('New Invitation')).toBeInTheDocument();
    expect(screen.getByText('You have been invited to a team')).toBeInTheDocument();
    expect(screen.getByText('2 mins ago')).toBeInTheDocument();
  });

  it('should call performAction accept when Прийняти is clicked', () => {
    render(<NotificationItem notification={mockNotification as any} />);
    fireEvent.click(screen.getByText('Прийняти'));
    expect(performAction).toHaveBeenCalledWith(1, 'accept');
  });

  it('should call performAction reject when Відхилити is clicked', () => {
    render(<NotificationItem notification={mockNotification as any} />);
    fireEvent.click(screen.getByText('Відхилити'));
    expect(performAction).toHaveBeenCalledWith(1, 'reject');
  });

  it('should mark as read when item is clicked', () => {
    const { container } = render(<NotificationItem notification={mockNotification as any} />);
    fireEvent.click(container.firstChild as HTMLElement);
    expect(performAction).toHaveBeenCalledWith(1, 'read');
  });

  it('should not mark as read if already read', () => {
    const readNotification = { ...mockNotification, status: 'RD' as const };
    const { container } = render(<NotificationItem notification={readNotification as any} />);
    fireEvent.click(container.firstChild as HTMLElement);
    expect(performAction).not.toHaveBeenCalledWith(1, 'read');
  });
});
