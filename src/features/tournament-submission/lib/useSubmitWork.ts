import type { SubmissionDto } from '@entities/team/model/team.types';
import { applyFieldErrors } from '@shared/lib/apiError';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { tournamentSubmissionApi } from '../api/tournamentSubmissionApi';

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
      const payload = {
        round: roundId,
        ...data,
      };

      if (submission) {
        await tournamentSubmissionApi.updateSubmission(teamId, submission.id, payload);
      } else {
        await tournamentSubmissionApi.createSubmission(teamId, payload);
      }

      navigate(`/tournaments/${tournamentId}/tournamentDetails/${roundId}`);
    } catch (err: unknown) {
      applyFieldErrors(err, form.setError, ['description', 'githubUrl', 'videoUrl', 'demoUrl']);
    } finally {
      onLoadingChange?.(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
