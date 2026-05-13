import { useAuthStore, userApi } from '@entities/user';
import {
  cityRules,
  discordRules,
  lastNamePatronymicRules,
  nameRules,
  organizationRules,
  telegramRules,
} from '@shared/lib/validation';
import { ActionInput, FormSubmitButton } from '@shared/ui';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import styles from './ProfileSettingsForm.module.css';

interface ProfileSettingsValues {
  firstName: string;
  lastName: string;
  city: string;
  organization: string;
  telegram: string;
  discord: string;
}

export const ProfileSettingsForm: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileSettingsValues>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      city: user?.city || '',
      organization: user?.organization || '',
      telegram: user?.telegram || '',
      discord: user?.discord || '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        city: user.city || '',
        organization: user.organization || '',
        telegram: user.telegram || '',
        discord: user.discord || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileSettingsValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await userApi.updateProfile(data);
      setUser(updatedUser);
      // Перекидуємо на вкладку "Профіль" після успішного збереження
      setSearchParams({ tab: 'general' });
    } catch {
      setError('Не вдалося оновити профіль. Спробуйте пізніше.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Налаштування профілю</h3>

      <div className={styles.fields}>
        <ActionInput
          label="Ім'я"
          placeholder="Введіть ім'я"
          error={errors.firstName?.message}
          props={{
            ...register('firstName', nameRules),
            autoComplete: 'given-name',
          }}
        />
        <ActionInput
          label='Прізвище та по батькові'
          placeholder='Прізвище та по батькові'
          error={errors.lastName?.message}
          props={{
            ...register('lastName', lastNamePatronymicRules),
            autoComplete: 'family-name',
          }}
        />
        <ActionInput
          label='Місто'
          placeholder='Ваше місто'
          error={errors.city?.message}
          props={{
            ...register('city', cityRules),
          }}
        />
        <ActionInput
          label='Організація'
          placeholder='Місце роботи або навчання'
          error={errors.organization?.message}
          props={{
            ...register('organization', organizationRules),
          }}
        />
        <ActionInput
          label='Телеграм'
          placeholder='@username'
          error={errors.telegram?.message}
          props={{
            ...register('telegram', telegramRules),
          }}
        />
        <ActionInput
          label='Діскорд'
          placeholder='username#0000'
          error={errors.discord?.message}
          props={{
            ...register('discord', discordRules),
          }}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <FormSubmitButton isLoading={isLoading} className={styles.submitBtn}>
        Зберегти зміни
      </FormSubmitButton>
    </form>
  );
};
