import type { RegisterOptions } from "react-hook-form"
import { emailRules, passwordRules, nameRules, confirmPasswordRules } from "@shared/lib/validation"

export interface RegisterFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const registerValidation = {
  name: nameRules satisfies RegisterOptions<RegisterFormValues, "name">,
  email: emailRules satisfies RegisterOptions<RegisterFormValues, "email">,
  password: passwordRules satisfies RegisterOptions<RegisterFormValues, "password">,
  confirmPassword: confirmPasswordRules satisfies RegisterOptions<RegisterFormValues, "confirmPassword">,
}
