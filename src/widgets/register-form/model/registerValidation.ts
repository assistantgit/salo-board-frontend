import {
  confirmPasswordRules,
  emailRules,
  lastNamePatronymicRules,
  nameRules,
  passwordRules,
} from '@shared/lib/validation';
import type { RegisterOptions } from 'react-hook-form';

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerValidation = {
  firstName: nameRules satisfies RegisterOptions<RegisterFormValues, 'firstName'>,
  lastName: lastNamePatronymicRules satisfies RegisterOptions<RegisterFormValues, 'lastName'>,
  email: emailRules satisfies RegisterOptions<RegisterFormValues, 'email'>,
  password: passwordRules satisfies RegisterOptions<RegisterFormValues, 'password'>,
  confirmPassword: confirmPasswordRules satisfies RegisterOptions<
    RegisterFormValues,
    'confirmPassword'
  >,
};
