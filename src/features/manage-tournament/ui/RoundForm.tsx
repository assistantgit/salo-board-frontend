import { roundApi } from '@entities/tournament/api/roundApi';
import type { RoundDto } from '@entities/tournament/model/tournament.types';
import {
  ActionInput,
  CalendarIcon,
  ChevronDownIcon,
  FormSubmitButton,
  TimerIcon,
} from '@shared/ui';
import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AttachmentManager } from './AttachmentManager';
import { CriterionManager } from './CriterionManager';
import { RequirementManager } from './RequirementManager';
import styles from './RoundForm.module.css';

interface RoundFormValues {
  title: string;
  description: string;
  startAt: string;
  deadline: string;
  orderIndex: number;
}

interface RoundFormProps {
  tournamentId: number;
  initialData?: RoundDto;
  onSuccess: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  initialOrderIndex?: number;
  readOnly?: boolean;
}

export const RoundForm: React.FC<RoundFormProps> = ({
  tournamentId,
  initialData,
  onSuccess,
  onCancel,
  onDelete,
  initialOrderIndex = 0,
  readOnly = false,
}) => {
  const isEdit = !!initialData?.id;
  const [isExpanded, setIsExpanded] = useState(!isEdit);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoundFormValues>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      startAt: initialData?.startAt ? new Date(initialData.startAt).toISOString().slice(0, 16) : '',
      deadline: initialData?.deadline
        ? new Date(initialData.deadline).toISOString().slice(0, 16)
        : '',
      orderIndex: initialData?.orderIndex ?? initialOrderIndex,
    },
  });

  const onSubmit = async (values: RoundFormValues) => {
    try {
      const payload: Partial<RoundDto> & { tournament?: number } = {
        ...values,
        tournament: tournamentId,
      };

      if (values.startAt) payload.startAt = new Date(values.startAt).toISOString();
      else delete payload.startAt;

      if (values.deadline) payload.deadline = new Date(values.deadline).toISOString();
      else delete payload.deadline;

      if (isEdit && initialData.id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { tournament, ...updatePayload } = payload;
        await roundApi.updateRound(tournamentId, initialData.id, updatePayload);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { tournament, ...createPayload } = payload;
        await roundApi.createRound(tournamentId, createPayload);
      }
      onSuccess();
    } catch (error: unknown) {
      console.error('Failed to save round:', error);
      const e = error as { response?: { data?: unknown } };
      if (e.response?.data) {
        console.error('Backend validation error:', e.response.data);
        alert(`Помилка валідації раунду: ${JSON.stringify(e.response.data, null, 2)}`);
      } else {
        alert('Сталася невідома помилка при збереженні раунду.');
      }
    }
  };

  const handleToggleExpand = () => {
    if (isEdit) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`${styles.wrapper} ${isExpanded ? styles.expandedWrapper : ''}`}>
      <button
        className={styles.header}
        onClick={handleToggleExpand}
        type='button'
        disabled={!isEdit}
        aria-expanded={isExpanded}
      >
        <div className={styles.headerInfo}>
          <span className={styles.orderBadge}>
            #{initialData?.orderIndex ?? initialOrderIndex + 1}
          </span>
          <h4 className={styles.roundTitle}>{initialData?.title || 'Новий раунд'}</h4>
          {isEdit && (
            <span className={styles.editHint}>
              {readOnly ? 'Тільки перегляд' : 'Редагувати деталі'}
            </span>
          )}
        </div>
        {isEdit && (
          <div className={styles.headerActions}>
            <div className={`${styles.expandIcon} ${isExpanded ? styles.isExpanded : ''}`}>
              <ChevronDownIcon size='sm' />
            </div>
          </div>
        )}
      </button>

      {isExpanded && (
        <div className={styles.content}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.mainInfo}>
              <ActionInput
                label='Назва раунду'
                placeholder='Напр. Кваліфікація'
                error={errors.title?.message}
                props={{
                  ...register('title', { required: "Назва обов'язкова" }),
                  disabled: readOnly,
                }}
              />

              <div className={styles.datesGrid}>
                <ActionInput
                  label='Початок раунду'
                  type='datetime-local'
                  placeholder='Виберіть дату'
                  Icon={CalendarIcon}
                  error={errors.startAt?.message}
                  props={{
                    ...register('startAt', { required: "Дата початку обов'язкова" }),
                    step: '1800',
                    disabled: readOnly,
                  }}
                />
                <ActionInput
                  label='Дедлайн'
                  type='datetime-local'
                  placeholder='Виберіть дату'
                  Icon={TimerIcon}
                  error={errors.deadline?.message}
                  props={{
                    ...register('deadline', { required: "Дедлайн обов'язковий" }),
                    step: '1800',
                    disabled: readOnly,
                  }}
                />
              </div>

              <ActionInput
                label='Опис раунду'
                placeholder='Інструкції для учасників'
                isTextArea
                error={errors.description?.message}
                props={{
                  ...register('description', { required: "Опис обов'язковий" }),
                  disabled: readOnly,
                }}
              />
            </div>

            <div className={styles.formActions}>
              {!readOnly && (
                <div className={styles.secondaryActions}>
                  {onCancel && (
                    <button type='button' className={styles.cancelBtn} onClick={onCancel}>
                      Скасувати
                    </button>
                  )}
                  {onDelete && (
                    <button type='button' className={styles.deleteBtn} onClick={onDelete}>
                      Видалити раунд
                    </button>
                  )}
                </div>
              )}
              {!readOnly && (
                <FormSubmitButton isLoading={isSubmitting} className={styles.submitBtn}>
                  {isEdit ? 'Оновити раунд' : 'Зберегти раунд'}
                </FormSubmitButton>
              )}
            </div>
          </form>

          {isEdit && initialData && (
            <div className={styles.nestedManagers}>
              <div className={styles.nestedSection}>
                <h5 className={styles.nestedTitle}>Вкладення</h5>
                <AttachmentManager
                  tournamentId={tournamentId}
                  roundId={initialData.id}
                  readOnly={readOnly}
                />
              </div>

              <div className={styles.nestedSection}>
                <h5 className={styles.nestedTitle}>Критерії оцінювання</h5>
                <CriterionManager
                  tournamentId={tournamentId}
                  roundId={initialData.id}
                  readOnly={readOnly}
                />
              </div>

              <div className={styles.nestedSection}>
                <h5 className={styles.nestedTitle}>Вимоги до подання</h5>
                <RequirementManager
                  tournamentId={tournamentId}
                  roundId={initialData.id}
                  readOnly={readOnly}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
