import type { BaseIconProps } from '@shared/model';
import { DefaultInput } from '@shared/ui';
import type React from 'react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import styles from './ActionInput.module.css';

type IconComponent = React.FC<BaseIconProps>;

interface ActionInputProps {
  type?: 'text' | 'url' | 'email' | 'number';
  placeholder: string;
  label?: string;
  Icon?: IconComponent;
  error?: string;
  inputClassName?: string;
  labelClassName?: string;
  isTextArea?: boolean;
  suffix?: string;
  min?: number;
  max?: number;
  props?:
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const ActionInput: React.FC<ActionInputProps> = ({
  type = 'text',
  placeholder,
  label,
  Icon,
  error,
  inputClassName = '',
  labelClassName = '',
  isTextArea = false,
  suffix,
  min,
  max,
  props,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = useCallback((textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    resizeTextarea(e.currentTarget);
    // Call original onInput if exists
    if (props && 'onInput' in props && typeof props.onInput === 'function') {
      (props.onInput as (e: React.FormEvent<HTMLTextAreaElement>) => void)(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
    }
    // Call original onKeyDown if exists
    if (props && 'onKeyDown' in props && typeof props.onKeyDown === 'function') {
      (props.onKeyDown as (e: React.KeyboardEvent<HTMLTextAreaElement>) => void)(e);
    }
  };

  // Merge internal and external refs
  const setRefs = useCallback(
    (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;
      const externalRef = (props as { ref?: React.Ref<HTMLTextAreaElement> })?.ref;
      if (typeof externalRef === 'function') {
        externalRef(node);
      } else if (externalRef) {
        (externalRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      }
    },
    [props],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: needed to resize on value changes
  useLayoutEffect(() => {
    if (isTextArea && textareaRef.current) {
      resizeTextarea(textareaRef.current);
    }
  }, [isTextArea, resizeTextarea, props?.value, props?.defaultValue]);

  return (
    <div className={styles.actionInput}>
      {(Icon || label) && (
        <div className={styles.header}>
          {Icon && <Icon className={styles.icon} size='lg' />}
          {label && <span className={`${styles.label} ${labelClassName}`}>{label}</span>}
        </div>
      )}
      <div className={styles.container}>
        {isTextArea ? (
          <textarea
            className={`${styles.textarea} ${inputClassName}`}
            placeholder={placeholder}
            rows={1}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            ref={setRefs}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <DefaultInput
            type={type}
            placeholder={placeholder}
            className={`${styles.input} ${inputClassName}`}
            min={min}
            max={max}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {error && (
        <p className={styles.error} role='alert'>
          {error}
        </p>
      )}
    </div>
  );
};
