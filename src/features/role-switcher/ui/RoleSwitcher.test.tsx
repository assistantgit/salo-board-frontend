import { type AuthState, useAuthStore } from '@entities/user';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RoleSwitcher } from './RoleSwitcher';

vi.mock('@entities/user', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('@shared/ui/dropdown-select', () => ({
  DropdownSelect: ({
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
  }) => (
    <select data-testid='dropdown-select' value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

describe('RoleSwitcher Component', () => {
  const setRole = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthStore).mockReturnValue({
      role: 'participant',
      setRole,
    } as unknown as AuthState);
  });

  it('should render with current role', () => {
    render(<RoleSwitcher />);
    const select = screen.getByTestId('dropdown-select') as HTMLSelectElement;
    expect(select.value).toBe('participant');
  });

  it('should call setRole when value changes', () => {
    render(<RoleSwitcher />);
    const select = screen.getByTestId('dropdown-select');
    fireEvent.change(select, { target: { value: 'admin' } });
    expect(setRole).toHaveBeenCalledWith('admin');
  });
});
