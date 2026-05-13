import type { SubmissionDto, SubmissionStatus } from '@entities/team/model/team.types';
import { applyFieldErrors } from '@shared/lib/apiError';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [targetStatus, setTargetStatus] = useState<SubmissionStatus>('DR');

  const form = useForm<FormValues>({
    defaultValues: {
      description: submission?.description || '',
      githubUrl: submission?.githubUrl || '',
      videoUrl: submission?.videoUrl || '',
      demoUrl: submission?.demoUrl || '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      onLoadingChange?.(true);

      if (submission) {
        // When updating, we might want to omit 'round' if the backend considers it immutable
        const payload: SubmitWorkPayload = {
          ...data,
          status: targetStatus,
        };
        await tournamentSubmissionApi.updateSubmission(teamId, submission.id, payload);
      } else {
        const payload: SubmitWorkPayload = {
          round: roundId,
          ...data,
          status: targetStatus,
        };
        await tournamentSubmissionApi.createSubmission(teamId, payload);
      }

      // If we are submitting (SB), go back to details. If saving draft (DR), maybe stay or show success.
      navigate(`/tournaments/${tournamentId}/tournamentDetails/${roundId}`);
    } catch (err: unknown) {
      applyFieldErrors(err, form.setError, ['description', 'githubUrl', 'videoUrl', 'demoUrl']);
    } finally {
      onLoadingChange?.(false);
    }
  };

  const onUnsubmit = useCallback(async () => {
    if (!submission) return;
    try {
      onLoadingChange?.(true);
      await tournamentSubmissionApi.changeStatus(teamId, submission.id, 'DR');
      window.location.reload();
    } catch (err: unknown) {
      console.error('Failed to unsubmit:', err);
    } finally {
      onLoadingChange?.(false);
    }
  }, [submission, teamId, onLoadingChange]);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    onUnsubmit,
    setTargetStatus,
  };
};
