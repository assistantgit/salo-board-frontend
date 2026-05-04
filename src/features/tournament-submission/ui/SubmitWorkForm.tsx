import type { SubmissionDto } from '@entities/team/model/team.types';
import { ActionInput } from '@shared/ui/inputs';
import type React from 'react';
import { useMemo } from 'react';
import { getSubmissionFields } from '../lib/submissionFields';
import { useSubmitWork } from '../lib/useSubmitWork';
import styles from './SubmitWorkForm.module.css';

interface SubmitWorkFormProps {
  tournamentId: number;
  roundId: number;
  teamId: number;
  submission?: SubmissionDto | null;
  onLoadingChange?: (isLoading: boolean) => void;
}

export const SubmitWorkForm: React.FC<SubmitWorkFormProps> = (props) => {
  const { form, onSubmit } = useSubmitWork(props);
  const {
    register,
    formState: { errors },
  } = form;

  const FORM_FIELDS = useMemo(() => getSubmissionFields(), []);

  return (
    <div className={styles.submitWorkWrapper}>
      <form id='submit-work-form' className={styles.submitWorkForm} onSubmit={onSubmit} noValidate>
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
              props={{ ...register(field.name, field.validation) }}
            />
          ))}
        </div>
      </form>
    </div>
  );
};
