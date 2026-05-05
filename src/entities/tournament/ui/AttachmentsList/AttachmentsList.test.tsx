import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { RoundAttachmentDto } from '../../model/tournament.types';
import { AttachmentsList } from './AttachmentsList';

describe('AttachmentsList Component', () => {
  const mockAttachments: RoundAttachmentDto[] = [
    { id: 1, label: 'Design Guide', url: 'http://example.com/1.pdf', orderIndex: 0, round: 1 },
    { id: 2, label: '', url: 'http://example.com/2.pdf', orderIndex: 1, round: 1 },
  ];

  it('should render all attachments as links', () => {
    render(<AttachmentsList attachments={mockAttachments} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'http://example.com/1.pdf');
    expect(screen.getByText('Design Guide')).toBeInTheDocument();
  });

  it('should render default label if none provided', () => {
    render(<AttachmentsList attachments={[mockAttachments[1]]} />);
    expect(screen.getByText('Документ')).toBeInTheDocument();
  });

  it('should render nothing if attachments is empty', () => {
    const { container } = render(<AttachmentsList attachments={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
