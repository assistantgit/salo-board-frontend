import type { RegisterOptions } from "react-hook-form"

export interface LoginFormValues {
  email: string
  password: string
}

export const loginValidation = {
  email: {
    required: "Email обов'язковий",
  } satisfies RegisterOptions<LoginFormValues, "email">,

  password: {
    required: "Пароль обов'язковий",
  } satisfies RegisterOptions<LoginFormValues, "password">,
}
