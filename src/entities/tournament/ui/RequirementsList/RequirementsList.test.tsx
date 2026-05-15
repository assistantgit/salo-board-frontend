import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { RoundRequirementDto } from '../../model/tournament.types';
import { RequirementsList } from './RequirementsList';

describe('RequirementsList Component', () => {
  const mockRequirements: RoundRequirementDto[] = [
    { id: 1, text: 'Must use React', orderIndex: 0, round: 1 },
    { id: 2, text: 'Must include tests', orderIndex: 1, round: 1 },
  ];

  it('should render all requirements', () => {
    render(<RequirementsList requirements={mockRequirements} />);
    expect(screen.getByText('Must use React')).toBeInTheDocument();
    expect(screen.getByText('Must include tests')).toBeInTheDocument();
  });

  it('should render correct number of list items', () => {
    const { container } = render(<RequirementsList requirements={mockRequirements} />);
    expect(container.querySelectorAll('li')).toHaveLength(2);
  });
});
