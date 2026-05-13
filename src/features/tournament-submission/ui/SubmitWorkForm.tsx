import type { SubmissionDto } from '@entities/team/model/team.types';
import { ActionInput } from '@shared/ui/inputs';
import type React from 'react';
import { useEffect, useMemo } from 'react';
import { getSubmissionFields } from '../lib/submissionFields';
import { useSubmitWork } from '../lib/useSubmitWork';
import styles from './SubmitWorkForm.module.css';

interface SubmitWorkFormProps {
  tournamentId: number;
  roundId: number;
  teamId: number;
  submission?: SubmissionDto | null;
  onLoadingChange?: (isLoading: boolean) => void;
  onActionsReady?: (actions: {
    saveDraft: () => void;
    submitWork: () => void;
    onUnsubmit: () => Promise<void>;
    isDirty: boolean;
  }) => void;
}

export const SubmitWorkForm: React.FC<SubmitWorkFormProps> = (props) => {
  const { form, saveDraft, submitWork, onUnsubmit, isDirty } = useSubmitWork(props);
  const {
    register,
    formState: { errors },
  } = form;

  const FORM_FIELDS = useMemo(() => getSubmissionFields(), []);

  // Lock if status is LK (Locked by admin) or SB (Submitted).
  const isLocked = props.submission?.status === 'LK' || props.submission?.status === 'SB';

  // Expose actions to parent for title buttons
  useEffect(() => {
    props.onActionsReady?.({ saveDraft, submitWork, onUnsubmit, isDirty });
  }, [saveDraft, submitWork, onUnsubmit, isDirty, props.onActionsReady]);

  return (
    <div className={styles.submitWorkWrapper}>
      <form
        id='submit-work-form'
        className={styles.submitWorkForm}
        onSubmit={submitWork}
        noValidate
      >
        {errors.root?.message && <div className={styles.globalError}>⚠ {errors.root.message}</div>}
        <div className={styles.formFields}>
          {FORM_FIELDS.map((field) => (
            <ActionInput
              key={field.name}
              type={field.type}
              isTextArea={field.isTextArea}
              label={field.label}
              placeholder={field.placeholder}
              Icon={field.Icon}
              error={errors[field.name]?.message}
              props={{
                ...register(field.name, isLocked ? undefined : field.validation),
                disabled: isLocked,
              }}
            />
          ))}
        </div>
      </form>
    </div>
  );
};
