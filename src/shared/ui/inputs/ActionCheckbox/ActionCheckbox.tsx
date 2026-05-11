import { CheckIcon } from '@shared/ui/icons';
import type React from 'react';
import styles from './ActionCheckbox.module.css';

interface ActionCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const ActionCheckbox: React.FC<ActionCheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <label
      className={`${styles.actionCheckbox} ${checked ? styles.checked : ''} ${
        disabled ? styles.disabled : ''
      }`}
    >
      <div className={styles.container}>
        <input
          type='checkbox'
          className={styles.input}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className={styles.box}>
          <CheckIcon className={styles.icon} size='sm' />
        </div>
      </div>
      <span className={styles.label}>{label}</span>
    </label>
  );
};
