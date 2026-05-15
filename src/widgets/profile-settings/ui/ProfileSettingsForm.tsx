import { useAuthStore, userApi } from '@entities/user';
import { useTelegramLink, useTelegramStatus } from '@entities/user/lib/hooks';
import {
  cityRules,
  discordRules,
  lastNamePatronymicRules,
  nameRules,
  organizationRules,
  telegramRules,
} from '@shared/lib/validation';
import {
  ActionInput,
  DefaultButton,
  DiscordIcon,
  Divider,
  FormSubmitButton,
  LocationIcon,
  PersonIcon,
  Skeleton,
  TelegramIcon,
  UserIcon,
} from '@shared/ui';
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
  const [isLinkRequested, setIsLinkRequested] = useState(false);

  const { isConnected, isLoading: isStatusLoading } = useTelegramStatus();
  const { link, isLoading: isLinkLoading, refetch: getLink } = useTelegramLink(isLinkRequested);

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

  const handleConnect = async () => {
    if (link) {
      window.open(link, '_blank');
    } else {
      setIsLinkRequested(true);
      const result = await getLink();
      if (result.data?.link) {
        window.open(result.data.link, '_blank');
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Налаштування профілю</h3>

      <div className={styles.sectionsContainer}>
        {/* ── Personal Info Section ── */}
        <section className={styles.formSection}>
          <header className={styles.sectionHeader}>
            <PersonIcon size='md' className={styles.sectionIcon} />
            <h4 className={styles.sectionTitle}>Особисті дані</h4>
          </header>
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
          </div>
        </section>

        {/* ── Additional Info Section ── */}
        <section className={styles.formSection}>
          <header className={styles.sectionHeader}>
            <LocationIcon size='md' className={styles.sectionIcon} />
            <h4 className={styles.sectionTitle}>Додаткова інформація</h4>
          </header>
          <div className={styles.fields}>
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
          </div>
        </section>

        {/* ── Social Media Section ── */}
        <section className={styles.formSection}>
          <header className={styles.sectionHeader}>
            <DiscordIcon size='md' className={styles.sectionIcon} />
            <h4 className={styles.sectionTitle}>Соціальні мережі</h4>
          </header>
          <div className={styles.fields}>
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
        </section>

        {/* ── Telegram Notifications Section ── */}
        <section className={styles.formSection}>
          <header className={styles.sectionHeader}>
            <TelegramIcon size='md' className={styles.sectionIcon} />
            <h4 className={styles.sectionTitle}>Сповіщення</h4>
          </header>
          <div className={styles.telegramSection}>
            <div className={styles.telegramHeader}>
              <TelegramIcon size='lg' />
              <div className={styles.telegramTitleContainer}>
                <span className={styles.telegramLabel}>Telegram Сповіщення</span>
                <div className={styles.statusContainer}>
                  {isStatusLoading ? (
                    <Skeleton width={80} height={20} />
                  ) : (
                    <span
                      className={`${styles.statusBadge} ${isConnected ? styles.connected : styles.disconnected}`}
                    >
                      {isConnected ? 'Підключено' : 'Не підключено'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {!isConnected && (
              <DefaultButton
                type='button'
                className={styles.connectButton}
                onClick={handleConnect}
                disabled={isLinkLoading}
              >
                {isLinkLoading ? (
                  'Завантаження...'
                ) : (
                  <>
                    <TelegramIcon size='sm' />
                    <span>Підключити Telegram</span>
                  </>
                )}
              </DefaultButton>
            )}
          </div>
        </section>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <FormSubmitButton isLoading={isLoading} className={styles.submitBtn}>
        Зберегти зміни
      </FormSubmitButton>
    </form>
  );
};
