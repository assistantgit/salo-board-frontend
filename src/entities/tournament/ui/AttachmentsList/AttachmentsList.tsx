import { DocumentIcon } from '@shared/ui';
import type { RoundAttachmentDto } from '../../model/tournament.types';
import styles from './AttachmentsList.module.css';

interface AttachmentsListProps {
  attachments: RoundAttachmentDto[];
  className?: string;
}

export const AttachmentsList = ({ attachments, className }: AttachmentsListProps) => {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className={`${styles.attachments} ${className || ''}`}>
      {attachments.map((file) => (
        <a
          key={file.id}
          href={file.url}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.attachmentLink}
        >
          <DocumentIcon />
          <span className={styles.fileName}>{file.label || 'Документ'}</span>
        </a>
      ))}
    </div>
  );
};
