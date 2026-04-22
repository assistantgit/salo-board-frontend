import type { RegisterOptions } from 'react-hook-form';
import type { TeamRegistrationFormValues } from './types';

export const teamRegistrationValidation = {
  name: {
    required: "Назва команди є обов'язковою",
    minLength: {
      value: 2,
      message: 'Мінімум 2 символи',
    },
    maxLength: {
      value: 100,
      message: 'Максимум 100 символів',
    },
    pattern: {
      value: /\S/,
      message: 'Назва не може бути порожньою',
    },
  } satisfies RegisterOptions<TeamRegistrationFormValues, 'name'>,
};
