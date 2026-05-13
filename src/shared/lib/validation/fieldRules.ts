export const emailRules = {
  required: "Email обов'язковий",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Введіть коректну електронну пошту',
  },
} as const;

export const passwordRules = {
  required: "Пароль обов'язковий",
  minLength: { value: 8, message: 'Мінімум 8 символів' },
  maxLength: { value: 64, message: 'Максимум 64 символи' },
} as const;

export const nameRules = {
  required: "Поле обов'язкове",
  minLength: { value: 2, message: 'Мінімум 2 символи' },
  maxLength: { value: 50, message: 'Максимум 50 символів' },
  pattern: {
    value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ' ]+$/,
    message: 'Тільки літери',
  },
} as const;

export const lastNamePatronymicRules = {
  ...nameRules,
  pattern: {
    value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ']+( [a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ']+)+$/,
    message: 'Введіть прізвище та по батькові через пробіл',
  },
} as const;

export const telegramRules = {
  pattern: {
    value: /^(@|(https?:\/\/)?t\.me\/)?[a-zA-Z0-9_]{3,64}$/,
    message: 'Введіть коректний Telegram (ім’я або посилання)',
  },
} as const;

export const discordRules = {
  pattern: {
    value: /^([a-z0-9._]{2,32}|(https?:\/\/)?discord(app)?\.com\/users\/\d{17,20})$/,
    message: 'Введіть коректний Discord (ім’я або посилання на профіль)',
  },
} as const;

export const cityRules = {
  minLength: { value: 2, message: 'Мінімум 2 символи' },
  maxLength: { value: 100, message: 'Максимум 100 символів' },
  pattern: {
    value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ' -]+$/,
    message: 'Тільки літери, пробіли та дефіси',
  },
} as const;

export const organizationRules = {
  maxLength: { value: 150, message: 'Максимум 150 символів' },
} as const;

export const confirmPasswordRules = {
  required: 'Підтвердіть пароль',
} as const;
