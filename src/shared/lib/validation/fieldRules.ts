export const emailRules = {
  required: "Email обов'язковий",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Введіть коректну електронну пошту",
  },
} as const

export const passwordRules = {
  required: "Пароль обов'язковий",
  minLength: { value: 8, message: "Мінімум 8 символів" },
  maxLength: { value: 64, message: "Максимум 64 символи" },
} as const

export const nameRules = {
  required: "Поле обов'язкове",
  minLength: { value: 2, message: "Мінімум 2 символи" },
  maxLength: { value: 50, message: "Максимум 50 символів" },
  pattern: {
    value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ' ]+$/,
    message: "Тільки літери",
  },
} as const

export const confirmPasswordRules = {
  required: "Підтвердіть пароль",
} as const
