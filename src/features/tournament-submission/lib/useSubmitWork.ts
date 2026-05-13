import type { SubmissionDto, SubmissionStatus } from '@entities/team/model/team.types';
import { applyFieldErrors } from '@shared/lib/apiError';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { type SubmitWorkPayload, tournamentSubmissionApi } from '../api/tournamentSubmissionApi';

interface UseSubmitWorkProps {
  tournamentId: number;
  roundId: number;
  teamId: number;
  submission?: SubmissionDto | null;
  onLoadingChange?: (isLoading: boolean) => void;
}

export interface FormValues {
  description: string;
  githubUrl: string;
  videoUrl: string;
  demoUrl: string;
}

export const useSubmitWork = ({
  tournamentId,
  roundId,
  teamId,
  submission,
  onLoadingChange,
}: UseSubmitWorkProps) => {
  const form = useForm<FormValues>({
    defaultValues: {
      description: submission?.description || '',
      githubUrl: submission?.githubUrl || '',
      videoUrl: submission?.videoUrl || '',
      demoUrl: submission?.demoUrl || '',
    },
  });

  const performSubmit = useCallback(
    async (data: FormValues, status: SubmissionStatus) => {
      try {
        onLoadingChange?.(true);

        const sanitized = Object.fromEntries(
          Object.entries(data)
            .map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
            .filter(([, v]) => v !== ''),
        ) as FormValues;

        if (submission) {
          await tournamentSubmissionApi.updateSubmission(teamId, submission.id, sanitized);

          // Change status if it differs
          if (submission.status !== status) {
            await tournamentSubmissionApi.changeStatus(teamId, submission.id, status);
          }
        } else {
          const payload: SubmitWorkPayload = {
            round: roundId,
            ...sanitized,
            status: status,
          };
          await tournamentSubmissionApi.createSubmission(teamId, payload);
        }

        // Reset form with new data to clear isDirty
        form.reset(data);

        // Force reload to ensure all widgets/badges reflect the new status
        if (status === 'SB') {
          window.location.href = `/tournaments/${tournamentId}/tournamentDetails/${roundId}`;
        } else {
          window.location.reload();
        }
      } catch (err: unknown) {
        const globalMsg = applyFieldErrors(err, form.setError, [
          'description',
          'githubUrl',
          'videoUrl',
          'demoUrl',
        ]);
        if (globalMsg) {
          form.setError('root', { type: 'server', message: globalMsg });
        }
      } finally {
        onLoadingChange?.(false);
      }
    },
    [teamId, submission, roundId, tournamentId, onLoadingChange, form],
  );

  const onUnsubmit = useCallback(async () => {
    if (!submission) return;
    try {
      onLoadingChange?.(true);
      await tournamentSubmissionApi.changeStatus(teamId, submission.id, 'DR');
      // Instead of reload, we could potentially just update local state if we had a provider,
      // but reload is consistent with current architecture.
      window.location.reload();
    } catch (err: unknown) {
      console.error('Failed to unsubmit:', err);
    } finally {
      onLoadingChange?.(false);
    }
  }, [submission, teamId, onLoadingChange]);

  const saveDraft = useMemo(
    () => form.handleSubmit((data) => performSubmit(data, 'DR')),
    [form, performSubmit],
  );
  const submitWork = useMemo(
    () => form.handleSubmit((data) => performSubmit(data, 'SB')),
    [form, performSubmit],
  );

  return {
    form,
    saveDraft,
    submitWork,
    onUnsubmit,
    isDirty: form.formState.isDirty,
  };
};
