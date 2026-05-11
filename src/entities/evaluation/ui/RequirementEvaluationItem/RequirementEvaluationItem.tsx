import type { RoundRequirementDto } from '@entities/tournament';
import { ActionCheckbox } from '@shared/ui/inputs';
import type { RequirementEvaluation } from '../../model/types';

interface RequirementEvaluationItemProps {
  requirement: RoundRequirementDto;
  evaluation?: RequirementEvaluation;
  onStatusChange: (reqEvalId: number, checked: boolean) => void;
  disabled?: boolean;
}

export const RequirementEvaluationItem = ({
  requirement,
  evaluation,
  onStatusChange,
  disabled,
}: RequirementEvaluationItemProps) => {
  return (
    <ActionCheckbox
      label={requirement.text}
      checked={evaluation?.isSatisfied ?? false}
      onChange={(checked) => {
        if (evaluation) {
          onStatusChange(evaluation.id, checked);
        }
      }}
      disabled={disabled}
    />
  );
};
