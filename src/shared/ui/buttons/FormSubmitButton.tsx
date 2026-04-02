import React from "react"
import { DefaultButton } from "../buttons/DefaultButton"
import "./FormSubmitButton.css"

interface FormSubmitButtonProps {
  children: React.ReactNode
  isLoading?: boolean
  className?: string
  disabled?: boolean
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  children,
  isLoading,
  className = "",
  disabled,
}) => {
  return (
    <DefaultButton
      type="submit"
      className={`form-submit-button ${className}`}
      disabled={isLoading || disabled}
    >
      {isLoading ? "Завантаження..." : children}
    </DefaultButton>
  )
}
