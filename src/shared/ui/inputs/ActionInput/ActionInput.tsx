import type { BaseIconProps } from '@shared/model';
import { DefaultInput } from '@shared/ui';
import type React from 'react';
import { useRef } from 'react';
import './ActionInput.css';

type IconComponent = React.FC<BaseIconProps>;

interface ActionInputProps {
  type?: 'text' | 'url' | 'email';
  placeholder: string;
  label?: string;
  Icon?: IconComponent;
  error?: string;
  inputClassName?: string;
  isTextArea?: boolean;
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
  inputClassName = 'action-input__input',
  isTextArea = false,
  props,
}) => {
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
    // Call original onInput if exists
    if (props && 'onInput' in props && typeof props.onInput === 'function') {
      props.onInput(e as any);
    }
  };

  return (
    <div className='action-input'>
      {(Icon || label) && (
        <div className='action-input__header'>
          {Icon && <Icon className='action-input__icon-el' size='lg' />}
          {label && <span className='action-input__label'>{label}</span>}
        </div>
      )}
      <div
        className={`action-input__container ${isTextArea ? 'action-input__container--textarea' : ''}`}
      >
        {isTextArea ? (
          <textarea
            className={`${inputClassName} action-input__textarea`}
            placeholder={placeholder}
            rows={1}
            onInput={handleInput}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <DefaultInput
            type={type}
            placeholder={placeholder}
            className={inputClassName}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
      {error && (
        <p className='action-input__error' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
};
