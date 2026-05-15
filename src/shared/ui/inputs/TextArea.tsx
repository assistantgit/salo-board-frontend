import type React from 'react';
import './TextArea.css';

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<TextAreaProps> = ({ className = '', ...props }) => {
  return <textarea className={`default-textarea ${className}`} {...props} />;
};
