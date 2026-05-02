import type { BaseIconProps } from '@shared/model';
import { DefaultInput } from '@shared/ui';
import type React from 'react';
import './ActionInput.css';

type IconComponent = React.FC<BaseIconProps>;

interface ActionInputProps {
  type?: 'text' | 'url' | 'email';
  placeholder: string;
  label?: string;
  Icon?: IconComponent;
  error?: string;
  inputClassName?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const ActionInput: React.FC<ActionInputProps> = ({
  type = 'text',
  placeholder,
  label,
  Icon,
  error,
  inputClassName = 'action-input__input',
  props,
}) => (
  <div className='action-input'>
    {(Icon || label) && (
      <div className='action-input__header'>
        {Icon && <Icon className='action-input__icon-el' size='lg' />}
        {label && <span className='action-input__label'>{label}</span>}
      </div>
    )}
    <div className='action-input__container'>
      <DefaultInput type={type} placeholder={placeholder} className={inputClassName} {...props} />
    </div>
    {error && (
      <p className='action-input__error' role='alert'>
        {error}
      </p>
    )}
  </div>
);
