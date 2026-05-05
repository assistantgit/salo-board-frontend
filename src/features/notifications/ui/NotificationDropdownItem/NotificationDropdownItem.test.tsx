import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useNotificationStore } from '../../model/store';
import { NotificationDropdownItem } from './NotificationDropdownItem';

vi.mock('../../model/store', () => ({
  useNotificationStore: vi.fn(),
}));

vi.mock('@shared/lib/date', () => ({
  formatRelativeTime: vi.fn(() => 'just now'),
}));

vi.mock('../NotificationAvatar/NotificationAvatar', () => ({
  NotificationAvatar: () => <div data-testid='avatar'>Avatar</div>,
}));

describe('NotificationDropdownItem Component', () => {
  const performAction = vi.fn();
  const mockNotification = {
    id: 1,
    type: 'JI' as const,
    title: 'Drop Note',
    message: 'Drop Message',
    status: 'UR' as const,
    actionType: 'YN' as const,
    createdAt: '2024-01-01',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useNotificationStore as any).mockReturnValue({ performAction });
  });

  it('should render content correctly', () => {
    render(<NotificationDropdownItem notification={mockNotification as any} />);
    expect(screen.getByText('Drop Note')).toBeInTheDocument();
    expect(screen.getByText('Drop Message')).toBeInTheDocument();
    expect(screen.getByText('just now')).toBeInTheDocument();
  });

  it('should call performAction when clicked', () => {
    const { container } = render(
      <NotificationDropdownItem notification={mockNotification as any} />,
    );
    fireEvent.click(container.firstChild as HTMLElement);
    expect(performAction).toHaveBeenCalledWith(1, 'read');
  });

  it('should call performAction accept when Прийняти is clicked', () => {
    render(<NotificationDropdownItem notification={mockNotification as any} />);
    fireEvent.click(screen.getByText('Прийняти'));
    expect(performAction).toHaveBeenCalledWith(1, 'accept');
  });
});
