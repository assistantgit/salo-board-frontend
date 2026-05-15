import { useAuthStore } from '@entities/user';
import { userApi } from '@entities/user/api/userApi';
import { authApi } from '@features/auth/api/authApi';
import { NavigateBackButton } from '@features/navigate';
import { applyFieldErrors } from '@shared/lib/apiError';
import { tokenStorage } from '@shared/lib/storage/tokenStorage';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import {
  AuthErrorBanner,
  AuthFooter,
  FormSubmitButton,
  LoginInputField,
  PasswordInputField,
  UserIcon,
} from '@shared/ui';
import { type RegisterFormValues, registerValidation } from '../model/registerValidation';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);

      // 1. Register — повертає токени (auto-login per OpenAPI spec)
      await authApi.register({
        email: data.email,
        password: data.password,
      });

      // 2. Оновлюємо профіль (firstName/lastName) — токен вже в storage
      const profile = await userApi.updateProfile({
        firstName: data.firstName,
        lastName: data.lastName,
      });

      // 3. Пишемо профіль у глобальний store
      setUser(profile);
      navigate('/');
    } catch (err: unknown) {
      // Якщо помилка після register (наприклад updateProfile впав) — чистимо токени
      tokenStorage.clearTokens();
      const generalError = applyFieldErrors(err, setError, ['email', 'password']);
      if (generalError) {
        setError('root', { message: generalError });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='register-wrapper'>
      <NavigateBackButton label='Назад' className='back-button-btn' />
      <div className='register-card'>
        <div className='user-icon-container'>
          <UserIcon size={'4xl'} />
        </div>

        <h1 className='register-title'>Реєстрація</h1>

        <form className='register-form' onSubmit={handleSubmit(onSubmit)} noValidate>
          <LoginInputField
            type='text'
            placeholder="Ім'я"
            autoComplete='given-name'
            inputClassName='register-input'
            error={errors.firstName?.message}
            props={{ ...register('firstName', registerValidation.firstName) }}
          />

          <LoginInputField
            type='text'
            placeholder='Прізвище та по батькові'
            autoComplete='family-name'
            inputClassName='register-input'
            error={errors.lastName?.message}
            props={{ ...register('lastName', registerValidation.lastName) }}
          />

          <LoginInputField
            type='email'
            placeholder='Електронна пошта'
            autoComplete='email'
            inputClassName='register-input'
            error={errors.email?.message}
            props={{ ...register('email', registerValidation.email) }}
          />

          <PasswordInputField
            placeholder='Пароль'
            autoComplete='new-password'
            inputClassName='register-input'
            error={errors.password?.message}
            props={{ ...register('password', registerValidation.password) }}
          />

          <PasswordInputField
            placeholder='Підтвердіть пароль'
            autoComplete='new-password'
            inputClassName='register-input'
            error={errors.confirmPassword?.message}
            props={{
              ...register('confirmPassword', {
                ...registerValidation.confirmPassword,
                validate: (value) => value === watch('password') || 'Паролі не співпадають',
              }),
            }}
          />

          <AuthErrorBanner message={errors.root?.message} />

          <FormSubmitButton isLoading={isLoading}>Зареєструватися</FormSubmitButton>
        </form>
        <AuthFooter text='Вже маєте обліковий запис?' linkText='Увійти' linkHref='/login' />
      </div>
    </div>
  );
};
