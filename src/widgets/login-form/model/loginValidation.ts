import type { RegisterOptions } from "react-hook-form"
import { emailRules, passwordRules } from "@shared/lib/validation"

export interface LoginFormValues {
  email: string
  password: string
}

export const loginValidation = {
  email: emailRules satisfies RegisterOptions<LoginFormValues, "email">,
  password: passwordRules satisfies RegisterOptions<LoginFormValues, "password">,
}
