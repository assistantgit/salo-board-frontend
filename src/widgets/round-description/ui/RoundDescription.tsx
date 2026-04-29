import { useRoundAttachments, useRoundDetails, useRoundRequirements } from '@entities/tournament';
import { ContentBlock, LinkIcon, Skeleton } from '@shared/ui';
import type React from 'react';
import styles from './RoundDescription.module.css';

interface RoundDescriptionProps {
  tournamentId: number;
  roundId: number;
}

export const RoundDescription: React.FC<RoundDescriptionProps> = ({ tournamentId, roundId }) => {
  const { data: round, isLoading: isRoundLoading } = useRoundDetails(tournamentId, roundId);
  const { data: requirements } = useRoundRequirements(tournamentId, roundId);
  const { data: attachments } = useRoundAttachments(tournamentId, roundId);

  if (isRoundLoading) return <Skeleton className={styles.skeleton} />;
  if (!round) return null;

  return (
    <div className={styles.container}>
      {/* 1. Task Description */}
      <ContentBlock title='Завдання' isCollapsible initialOpen>
        <div className={styles.text}>{round.description || 'Опис завдання відсутній.'}</div>
      </ContentBlock>

      {/* 2. Requirements */}
      {requirements && requirements.length > 0 && (
        <ContentBlock title='Вимоги' isCollapsible initialOpen>
          <ul className={styles.list}>
            {requirements.map((req) => (
              <li key={req.id} className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                {req.text}
              </li>
            ))}
          </ul>
        </ContentBlock>
      )}

      {/* 3. Attachments */}
      {attachments && attachments.length > 0 && (
        <ContentBlock title='Додатки' isCollapsible initialOpen>
          <div className={styles.attachments}>
            {attachments.map((file) => (
              <a
                key={file.id}
                href={file.url}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.attachmentLink}
              >
                <LinkIcon size={20} />
                <span className={styles.fileName}>{file.label || 'Документ'}</span>
              </a>
            ))}
          </div>
        </ContentBlock>
      )}
    </div>
  );
};
