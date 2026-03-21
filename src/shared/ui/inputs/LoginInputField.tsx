import React from "react"
import { DefaultInput } from '@shared/ui'
import "./LoginInputField.css"

interface LoginInputFieldProps {
  type: "email" | "password" | "text"
  placeholder: string
  autoComplete?: string
  error?: string
  inputClassName?: string
  props?: React.InputHTMLAttributes<HTMLInputElement>
}

export const LoginInputField: React.FC<LoginInputFieldProps> = ({
  type,
  placeholder,
  autoComplete,
  error,
  inputClassName = "login-input-field__input",
  props,
}) => (
  <div className="login-input-field">
    <DefaultInput
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={inputClassName}
      {...props}
    />
    {error && (
      <p className="login-input-field__error" role="alert">
        {error}
      </p>
    )}
  </div>
)