import type { RegisterOptions } from "react-hook-form"

type LoginFormValues = {
  email: string
  password: string
}

export const loginValidation = {
  email: {
    required: "Email обов'язковий",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Введіть коректний email",
    },
  } satisfies RegisterOptions<LoginFormValues, "email">,

  password: {
    required: "Пароль обов'язковий",
  } satisfies RegisterOptions<LoginFormValues, "password">,
}