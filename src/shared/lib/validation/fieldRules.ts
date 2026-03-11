export const emailRules = {
  required: "Email обов'язковий",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Введіть коректний email",
  },
} as const

export const passwordRules = {
  required: "Пароль обов'язковий",
  minLength: { value: 6, message: "Мінімум 6 символів" },
} as const

export const nameRules = {
  required: "Ім'я є обов'язковим",
  minLength: { value: 2, message: "Мінімум 2 символи" },
} as const

export const confirmPasswordRules = {
  required: "Підтвердіть пароль",
} as const
