import React, { type InputHTMLAttributes, useState } from 'react';
import styles from './ActionInput.module.css';

interface ActionInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  /**
   * Label text displayed above the input.
   */
  label?: string;

  /**
   * Icon displayed next to the label.
   */
  icon?: React.ReactNode;

  /**
   * Called when the user clicks the action button or presses Enter.
   */
  onAction?: (value: string) => void;

  /**
   * If true, shows a loader and disables interactions.
   */
  isLoading?: boolean;

  /**
   * Optional icon for the submit button. If provided, the button is rendered.
   */
  actionIcon?: React.ReactNode;
}

/**
 * ActionInput component.
 * Flexible base for inputs that require an action (like submitting a URL, adding a link, etc.)
 *
 * SOLID Principles:
 * - SRP: Manages input state and action trigger.
 * - OCP: Extensible via slots (icon, actionIcon) and props.
 * - ISP: Focused on the input + label + action interaction.
 */
export const ActionInput: React.FC<ActionInputProps> = ({
  label,
  icon,
  onAction,
  isLoading = false,
  actionIcon,
  className = '',
  value,
  onChange,
  disabled,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState('');

  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as string) : internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
  };

  const handleAction = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (onAction && !isLoading && !disabled && currentValue.trim()) {
      onAction(currentValue);
    }
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {(label || icon) && (
        <div className={styles.labelWrapper}>
          {icon && <div className={styles.icon}>{icon}</div>}
          {label && <span className={styles.label}>{label}</span>}
        </div>
      )}
      <form className={styles.container} onSubmit={handleAction}>
        <input
          className={styles.input}
          value={currentValue}
          onChange={handleInputChange}
          disabled={isLoading || disabled}
          {...props}
        />
        {actionIcon && (
          <button
            type='submit'
            className={styles.actionButton}
            disabled={isLoading || disabled || !currentValue.trim()}
            aria-label={label ? `Submit ${label}` : 'Submit'}
          >
            {isLoading ? <div className={styles.loader} /> : actionIcon}
          </button>
        )}
      </form>
    </div>
  );
};
