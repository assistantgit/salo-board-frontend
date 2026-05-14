import { tournamentApi } from '@entities/tournament';
import type { TournamentDomain, TournamentDto } from '@entities/tournament/model/tournament.types';
import {
  ActionCheckbox,
  ActionInput,
  CalendarIcon,
  CodeIcon,
  DocumentIcon,
  FormSubmitButton,
  PeopleIcon,
  TimerIcon,
} from '@shared/ui';
import type React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './TournamentForm.module.css';

interface TournamentFormValues {
  title: string;
  description: string;
  rules: string;
  startDate: string;
  regOpenAt: string;
  regCloseAt: string;
  endedAt: string;
  isTeamVisible: boolean;
  minTeamSize: number;
  maxTeamSize: number;
  maxTeam: number;
}

interface TournamentFormProps {
  initialData?: Partial<TournamentDto>;
  onSuccess?: (id: number) => void;
  readOnly?: boolean;
}

export const TournamentForm: React.FC<TournamentFormProps> = ({
  initialData,
  onSuccess,
  readOnly = false,
}) => {
  const isEdit = !!initialData?.id;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TournamentFormValues>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      rules: initialData?.rules || '',
      startDate: initialData?.startDate
        ? new Date(initialData.startDate).toISOString().slice(0, 16)
        : '',
      regOpenAt: initialData?.regOpenAt
        ? new Date(initialData.regOpenAt).toISOString().slice(0, 16)
        : '',
      regCloseAt: initialData?.regCloseAt
        ? new Date(initialData.regCloseAt).toISOString().slice(0, 16)
        : '',
      endedAt: initialData?.endedAt ? new Date(initialData.endedAt).toISOString().slice(0, 16) : '',
      isTeamVisible: initialData?.isTeamVisible ?? true,
      minTeamSize: initialData?.minTeamSize || 2,
      maxTeamSize: initialData?.maxTeamSize || 5,
      maxTeam: initialData?.maxTeam || 100,
    },
  });

  const onSubmit = async (values: TournamentFormValues) => {
    try {
      const payload: Partial<TournamentDto> = {
        title: values.title,
        description: values.description,
        rules: values.rules,
        isTeamVisible: values.isTeamVisible,
        minTeamSize: values.minTeamSize,
        maxTeamSize: values.maxTeamSize,
        maxTeam: values.maxTeam,
      };

      if (values.startDate) payload.startDate = new Date(values.startDate).toISOString();
      if (values.regOpenAt) payload.regOpenAt = new Date(values.regOpenAt).toISOString();
      if (values.regCloseAt) payload.regCloseAt = new Date(values.regCloseAt).toISOString();
      if (values.endedAt) payload.endedAt = new Date(values.endedAt).toISOString();

      let result: TournamentDomain;
      if (isEdit && initialData.id) {
        result = await tournamentApi.updateTournament(initialData.id, payload);
      } else {
        result = await tournamentApi.createTournament(payload);
      }

      onSuccess?.(result.id);
    } catch (err: unknown) {
      console.error('Failed to save tournament:', err);
      const e = err as { response?: { data?: { error?: string; detail?: string } } };
      if (e.response?.data) {
        console.error('Backend validation error:', e.response.data);
        alert(`Помилка валідації: ${JSON.stringify(e.response.data, null, 2)}`);
      } else {
        alert('Сталася невідома помилка при збереженні турніру.');
      }
    }
  };

  return (
    <form onSubmit={readOnly ? undefined : handleSubmit(onSubmit)} className={styles.form}>
      <header className={styles.headerTitle}>
        <h2 className={styles.title}>{isEdit ? 'Налаштування турніру' : 'Створення турніру'}</h2>
      </header>

      {readOnly && (
        <div className={styles.readOnlyBanner}>
          <p className={styles.readOnlyBannerTitle}>Режим перегляду</p>
          <p className={styles.readOnlyBannerSub}>
            Редагувати можна тільки турніри зі статусом Draft. Налаштування заблоковано.
          </p>
        </div>
      )}

      <div className={styles.mainGrid}>
        {/* Left Column: General Info */}
        <div className={styles.column}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <DocumentIcon size='sm' /> Загальна інформація
            </h3>
            <ActionInput
              label='Назва турніру'
              placeholder='Введіть назву турніру'
              error={errors.title?.message}
              props={{
                ...register('title', { required: "Назва обов'язкова" }),
                disabled: readOnly,
              }}
            />
            <ActionInput
              label='Опис'
              placeholder='Про що цей турнір?'
              isTextArea
              error={errors.description?.message}
              props={{
                ...register('description', { required: "Опис обов'язковий" }),
                disabled: readOnly,
              }}
            />
            <ActionInput
              label='Правила'
              placeholder='Вкажіть правила турніру'
              Icon={CodeIcon}
              isTextArea
              error={errors.rules?.message}
              props={{
                ...register('rules', { required: "Правила обов'язкові" }),
                disabled: readOnly,
              }}
            />
          </section>
        </div>

        {/* Right Column: Settings & Timeline */}
        <div className={styles.column}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <PeopleIcon size='sm' /> Налаштування команд
            </h3>
            <div className={styles.settingsRow}>
              <div className={styles.checkboxField}>
                <Controller
                  name='isTeamVisible'
                  control={control}
                  render={({ field }) => (
                    <ActionCheckbox
                      label='Команди видимі'
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={readOnly}
                    />
                  )}
                />
              </div>
              <ActionInput
                label='Макс. команд'
                type='number'
                placeholder='100'
                error={errors.maxTeam?.message}
                props={{
                  ...register('maxTeam', { valueAsNumber: true }),
                  disabled: readOnly,
                }}
              />
            </div>
            <div className={styles.settingsRow}>
              <ActionInput
                label='Мін. учасників'
                type='number'
                placeholder='2'
                error={errors.minTeamSize?.message}
                props={{
                  ...register('minTeamSize', {
                    valueAsNumber: true,
                    min: { value: 2, message: 'Мінімум 2 учасники' },
                  }),
                  disabled: readOnly,
                }}
              />
              <ActionInput
                label='Макс. учасників'
                type='number'
                placeholder='5'
                error={errors.maxTeamSize?.message}
                props={{
                  ...register('maxTeamSize', { valueAsNumber: true }),
                  disabled: readOnly,
                }}
              />
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <CalendarIcon size='sm' /> Часові межі (Крок: 30 хв)
            </h3>
            <div className={styles.timelineGrid}>
              <ActionInput
                label='Відкриття реєстрації'
                type='datetime-local'
                placeholder='Виберіть час'
                Icon={TimerIcon}
                inputClassName={styles.dateInput}
                error={errors.regOpenAt?.message}
                props={{
                  ...register('regOpenAt', { required: "Дата відкриття обов'язкова" }),
                  step: '1800',
                  disabled: readOnly,
                }}
              />
              <ActionInput
                label='Закриття реєстрації'
                type='datetime-local'
                placeholder='Виберіть час'
                Icon={TimerIcon}
                inputClassName={styles.dateInput}
                error={errors.regCloseAt?.message}
                props={{
                  ...register('regCloseAt', { required: "Дата закриття обов'язкова" }),
                  step: '1800',
                  disabled: readOnly,
                }}
              />
              <ActionInput
                label='Початок турніру'
                type='datetime-local'
                placeholder='Виберіть час'
                Icon={CalendarIcon}
                inputClassName={styles.dateInput}
                error={errors.startDate?.message}
                props={{
                  ...register('startDate', { required: "Дата початку обов'язкова" }),
                  step: '1800',
                  disabled: readOnly,
                }}
              />
              <ActionInput
                label='Завершення турніру'
                type='datetime-local'
                placeholder='Виберіть час'
                Icon={CalendarIcon}
                inputClassName={styles.dateInput}
                error={errors.endedAt?.message}
                props={{
                  ...register('endedAt', { required: "Дата завершення обов'язкова" }),
                  step: '1800',
                  disabled: readOnly,
                }}
              />
            </div>
          </section>
        </div>
      </div>

      {!readOnly && (
        <div className={styles.actions}>
          <FormSubmitButton isLoading={isSubmitting} className={styles.submitBtn}>
            {isEdit ? 'Зберегти налаштування турніру' : 'Створити новий турнір'}
          </FormSubmitButton>
        </div>
      )}
    </form>
  );
};
