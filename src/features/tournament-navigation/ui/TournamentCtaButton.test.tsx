import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { getCtaConfig } from '../lib/getCtaConfig';
import { TournamentCtaButton } from './TournamentCtaButton';

vi.mock('../lib/getCtaConfig', () => ({
  getCtaConfig: vi.fn(),
}));

describe('TournamentCtaButton Component', () => {
  it('should render correctly with label and href', () => {
    (getCtaConfig as any).mockReturnValue({
      label: 'Open',
      href: (id: number) => `/tournament/${id}`,
    });

    render(
      <MemoryRouter>
        <TournamentCtaButton id={1} status='RN' />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: /Open/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/tournament/1');
  });

  it('should apply status-specific class', () => {
    (getCtaConfig as any).mockReturnValue({
      label: 'Open',
      href: (id: number) => `/tournament/${id}`,
    });

    const { container } = render(
      <MemoryRouter>
        <TournamentCtaButton id={1} status='RN' />
      </MemoryRouter>,
    );

    expect(container.firstChild).toHaveClass(/rn/);
  });
});
