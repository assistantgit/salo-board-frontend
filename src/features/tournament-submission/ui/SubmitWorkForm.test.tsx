import { render, screen } from '@testing-library/react';
import type React from 'react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { useSubmitWork } from '../lib/useSubmitWork';
import { SubmitWorkForm } from './SubmitWorkForm';

// Mock the hooks
vi.mock('../lib/useSubmitWork', () => ({
  useSubmitWork: vi.fn(),
}));

// Helper to provide a real useForm instance to the mock
const FormWrapper = ({ props }: { props: React.ComponentProps<typeof SubmitWorkForm> }) => {
  const form = useForm();
  const onSubmit = vi.fn((e) => e.preventDefault());

  vi.mocked(useSubmitWork).mockReturnValue({
    form,
    onSubmit,
  } as unknown as ReturnType<typeof useSubmitWork>);

  return <SubmitWorkForm {...props} />;
};

describe('SubmitWorkForm Component', () => {
  const mockProps = {
    tournamentId: 1,
    roundId: 1,
    teamId: 1,
  };

  it('should render all form fields', () => {
    render(<FormWrapper props={mockProps} />);

    expect(screen.getByText('Опис роботи')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Video')).toBeInTheDocument();
    expect(screen.getByText('Demo')).toBeInTheDocument();
  });

  it('should have a form with correct id', () => {
    vi.mocked(useSubmitWork).mockReturnValue({
      form: {
        register: vi.fn(),
        formState: { errors: {} },
      } as unknown as ReturnType<typeof useSubmitWork>['form'],
      onSubmit: vi.fn(),
    } as unknown as ReturnType<typeof useSubmitWork>);

    const { container } = render(<SubmitWorkForm {...mockProps} />);
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute('id', 'submit-work-form');
  });
});
