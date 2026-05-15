import { RequirementsList } from '@entities/tournament';
import { ContentBlock } from '@shared/ui';
import type { RoundRequirementDto } from '../../model/tournament.types';

interface RequirementsContentBlockProps {
  requirements: RoundRequirementDto[];
}

export const RequirementsContentBlock = ({ requirements }: RequirementsContentBlockProps) => {
  if (!requirements || requirements.length === 0) return null;

  return (
    <ContentBlock title='Вимоги' isCollapsible initialOpen>
      <RequirementsList requirements={requirements} />
    </ContentBlock>
  );
};
