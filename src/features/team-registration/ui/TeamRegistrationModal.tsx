import React from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { Modal, AuthErrorBanner, DefaultButton } from '@shared/ui';
import { teamRegistrationApi } from '../api/teamRegistrationApi';
import { teamRegistrationValidation } from '../model/teamRegistrationValidation';
import type { TeamRegistrationFormValues } from '../model/types';
import styles from './TeamRegistrationModal.module.css';

interface TeamRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournamentId: number;
}

export const TeamRegistrationModal: React.FC<TeamRegistrationModalProps> = ({
  isOpen,
  onClose,
  tournamentId,
}) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<TeamRegistrationFormValues>();

  const handleClose = React.useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const onSubmit = async (data: TeamRegistrationFormValues) => {
    try {
      setIsLoading(true);
      await teamRegistrationApi.createTeam({
        name: data.name.trim(),
        tournament: tournamentId,
      });
      await queryClient.invalidateQueries({ queryKey: ['my-teams'] });
      handleClose();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { detail?: string; error?: string; name?: string[] } } };
      const data = axiosErr?.response?.data;

      if (!axiosErr?.response) {
        setError('root', { message: "Помилка мережі. Перевірте з'єднання." });
        return;
      }

      const nameErrors = data?.name;
      if (Array.isArray(nameErrors) && nameErrors.length > 0) {
        setError('name', { type: 'server', message: nameErrors[0] });
        return;
      }

      const general = data?.detail || data?.error;
      if (general) {
        setError('root', { message: general });
        return;
      }

      setError('root', { message: 'Щось пішло не так. Спробуйте ще раз.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} lazy>
      <div className={styles.card}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <h2 className={styles.title}>Реєстрація команди</h2>
          <p className={styles.subtitle}>Заповніть дані для участі в турнірі</p>
        </div>

        {/* ── Notice Box ── */}
        <div className={styles.notice}>
          <div className={styles.noticeIcon} aria-hidden="true">i</div>
          <p className={styles.noticeText}>
            Важливо: Якщо ви зареєструєте цю команду, то не зможете доєднатися до іншої команди в цьому турнірі.
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="team-name-input">
              Назва команди
            </label>
            <input
              id="team-name-input"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Наприклад: Dream Team"
              autoComplete="off"
              disabled={isLoading}
              {...register('name', teamRegistrationValidation.name)}
            />
            {errors.name?.message && (
              <AuthErrorBanner message={errors.name.message} />
            )}
          </div>

          <AuthErrorBanner message={errors.root?.message} />

          <DefaultButton
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
            style={{ marginTop: 24 }}
          >
            {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
          </DefaultButton>
        </form>
      </div>
    </Modal>
  );
};
