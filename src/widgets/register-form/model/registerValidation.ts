import type { RegisterOptions } from "react-hook-form"
import { emailRules, passwordRules, nameRules, confirmPasswordRules } from "@shared/lib/validation"

export interface RegisterFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export const registerValidation = {
  firstName: nameRules satisfies RegisterOptions<RegisterFormValues, "firstName">,
  lastName: nameRules satisfies RegisterOptions<RegisterFormValues, "lastName">,
  email: emailRules satisfies RegisterOptions<RegisterFormValues, "email">,
  password: passwordRules satisfies RegisterOptions<RegisterFormValues, "password">,
  confirmPassword: confirmPasswordRules satisfies RegisterOptions<RegisterFormValues, "confirmPassword">,
}
