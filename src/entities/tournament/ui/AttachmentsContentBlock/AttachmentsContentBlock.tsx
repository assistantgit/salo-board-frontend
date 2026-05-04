import { ContentBlock } from '@shared/ui';
import type { RoundAttachmentDto } from '../../model/tournament.types';
import { AttachmentsList } from '../AttachmentsList/AttachmentsList';

interface AttachmentsContentBlockProps {
  attachments: RoundAttachmentDto[];
}

export const AttachmentsContentBlock = ({ attachments }: AttachmentsContentBlockProps) => {
  if (!attachments || attachments.length === 0) return null;

  return (
    <ContentBlock title='Додатки' isCollapsible initialOpen>
      <AttachmentsList attachments={attachments} />
    </ContentBlock>
  );
};
