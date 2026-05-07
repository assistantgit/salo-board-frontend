import { useAuthStore } from '@entities/user';
import { userApi } from '@entities/user/api/userApi';
import { authApi } from '@features/auth/api/authApi';
import { NavigateBackButton } from '@features/navigate';
import { applyFieldErrors } from '@shared/lib/apiError';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import {
  AuthErrorBanner,
  AuthFooter,
  FormSubmitButton,
  LoginInputField,
  PasswordInputField,
  UserIcon,
} from '@shared/ui';
import { type LoginFormValues, loginValidation } from '../model/loginValidation';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const { setUserName } = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      await authApi.login(data);
      // Після успішного логіну — завантажуємо базову інформацію
      const name = await userApi.getShortProfile();
      setUserName(name);
      navigate('/');
    } catch (err: unknown) {
      const generalError = applyFieldErrors(err, setError, ['email', 'password']);
      if (generalError) {
        setError('root', { message: generalError });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login-wrapper'>
      <NavigateBackButton label='На головну' className='back-button-btn' />
      <div className='login-card'>
        <div className='user-icon-container'>
          <UserIcon size={'4xl'} />
        </div>
        <h1 className='login-title'>Вхід</h1>

        <form className='login-form' onSubmit={handleSubmit(onSubmit)} noValidate>
          <LoginInputField
            type='email'
            placeholder='Пошта'
            autoComplete='email'
            inputClassName='login-input'
            error={errors.email?.message}
            props={{ ...register('email', loginValidation.email) }}
          />

          <PasswordInputField
            placeholder='Пароль'
            autoComplete='current-password'
            inputClassName='login-input'
            error={errors.password?.message}
            props={{ ...register('password', loginValidation.password) }}
          />

          <AuthErrorBanner message={errors.root?.message} />

          <FormSubmitButton isLoading={isLoading}>Увійти</FormSubmitButton>
        </form>
        <AuthFooter text='Немаєте облікового запису?' linkText='Створити' linkHref='/register' />
      </div>
    </div>
  );
};
