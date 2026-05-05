import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TeamMemberSlot } from './TeamMemberSlot';

describe('TeamMemberSlot Component', () => {
  it('should render default label', () => {
    render(<TeamMemberSlot />);
    expect(screen.getByText(/Очікування учасника/i)).toBeInTheDocument();
  });

  it('should render custom label', () => {
    render(<TeamMemberSlot label='Custom Label' />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('should render question mark icon placeholder', () => {
    render(<TeamMemberSlot />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
