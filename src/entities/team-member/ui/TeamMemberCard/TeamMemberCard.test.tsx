import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TeamMemberCard } from './TeamMemberCard';

vi.mock('@entities/user', () => ({
  UserAvatar: ({ fullName }: { fullName: string }) => (
    <div data-testid='user-avatar'>{fullName}</div>
  ),
}));

describe('TeamMemberCard Component', () => {
  const mockMember = {
    id: '1',
    fullName: 'John Smith',
    isLead: true,
    isCurrentUser: false,
    canBeDeleted: true,
  };

  it('should render member name and lead badge', () => {
    render(<TeamMemberCard member={mockMember} />);
    // Check that name is present (at least once, but actually twice is fine as long as we use getAll)
    expect(screen.getAllByText('John Smith')).toHaveLength(2);
    expect(screen.getByText('Лідер')).toBeInTheDocument();
  });

  it('should render "Ви" badge if it is current user', () => {
    const currentMember = { ...mockMember, isCurrentUser: true };
    render(<TeamMemberCard member={currentMember} />);
    expect(screen.getByText('Ви')).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(<TeamMemberCard member={mockMember} onDelete={onDelete} />);

    fireEvent.click(screen.getByLabelText(/Видалити John Smith/i));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('should not show delete button for current user', () => {
    const currentMember = { ...mockMember, isCurrentUser: true };
    render(<TeamMemberCard member={currentMember} />);
    expect(screen.queryByLabelText(/Видалити/i)).not.toBeInTheDocument();
  });
});
