import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DropdownSelect } from './DropdownSelect';

describe('DropdownSelect Component', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  it('should render with placeholder and toggle menu on click', () => {
    render(<DropdownSelect options={options} placeholder='Select item' />);

    expect(screen.getByText('Select item')).toBeInTheDocument();

    const trigger = screen.getByRole('button', { name: /Select item/i });
    fireEvent.click(trigger);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should call onChange and close menu when option is selected', () => {
    const onChange = vi.fn();
    render(<DropdownSelect options={options} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /Оберіть значення/i }));
    fireEvent.click(screen.getByText('Option 2'));

    expect(onChange).toHaveBeenCalledWith('2');
    // The dropdown remains in DOM but should not have the "Open" class
    expect(screen.getByRole('listbox')).not.toHaveClass(/dropdownOpen/);
  });

  it('should render selected option label in trigger', () => {
    render(<DropdownSelect options={options} value='1' />);
    // Check for the text in the trigger specifically
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveTextContent('Option 1');
  });

  it('should apply custom className', () => {
    const { container } = render(<DropdownSelect options={options} className='custom-select' />);
    expect(container.firstChild).toHaveClass('custom-select');
  });
});
