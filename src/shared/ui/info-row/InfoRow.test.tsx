import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InfoRow } from './InfoRow';

describe('InfoRow Component', () => {
  it('should render icon, label and value', () => {
    render(
      <InfoRow 
        icon={<span data-testid="icon">i</span>} 
        label="Name" 
        value="John Doe" 
      />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render dash if value is empty', () => {
    render(<InfoRow icon="i" label="Name" value="" />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
