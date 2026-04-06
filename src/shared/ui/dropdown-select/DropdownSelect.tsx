import { useState, useRef, type ReactNode } from 'react';
import { useClickOutside } from '@shared/lib';
import { ChevronDownIcon, CheckIcon } from '../icons';
import styles from './DropdownSelect.module.css';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface DropdownSelectProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const DropdownSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Оберіть значення',
}: DropdownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const selectedOption = options.find((opt) => opt.value === value);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerActive : ''}`}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.triggerContent}>
          {selectedOption?.icon && (
            <span className={styles.iconWrap}>{selectedOption.icon}</span>
          )}
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
          <ChevronDownIcon size="sm" />
        </span>
      </button>

      <div
        className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ''}`}
        role="listbox"
      >
        <ul className={styles.optionList}>
          {options.map((option, index) => {
            const isSelected = value === option.value;
            return (
              <li key={option.value} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                  onClick={() => handleSelect(option.value)}
                  style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
                >
                  <div className={styles.activeIndicator} />
                  <div className={styles.optionContent}>
                    {option.icon && <span className={styles.iconWrap}>{option.icon}</span>}
                    <span>{option.label}</span>
                  </div>
                  <CheckIcon className={styles.checkIcon} size="sm" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
