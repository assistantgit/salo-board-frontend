import type { SubmissionDto } from '@entities/team';
import { LinkIcon } from '@shared/ui/icons';
import type React from 'react';
import styles from './SubmissionInfoCard.module.css';

interface SubmissionMetaLinksProps {
  submission: SubmissionDto;
}

export const SubmissionMetaLinks: React.FC<SubmissionMetaLinksProps> = ({ submission }) => {
  const displayDate = submission.submittedAt || submission.createdAt;
  const formattedDate = displayDate ? new Date(displayDate).toLocaleDateString('uk-UA') : '—';

  return (
    <div className={styles.metaContainer}>
      <div className={styles.metaItem}>
        <div className={styles.metaLabel}>Опис</div>
        <div className={styles.metaValue}>{submission.description || '—'}</div>
      </div>

      {/* Винести як окреми компонент*/}
      {submission.githubUrl && (
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>GitHub</div>
          <div className={styles.metaValue}>
            <a
              href={submission.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
              title={submission.githubUrl}
            >
              <LinkIcon size='sm' className={styles.linkIcon} />
              <span className={styles.linkText}>{submission.githubUrl}</span>
            </a>
          </div>
        </div>
      )}

      {submission.videoUrl && (
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Відео</div>
          <div className={styles.metaValue}>
            <a
              href={submission.videoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
              title={submission.videoUrl}
            >
              <LinkIcon size='sm' className={styles.linkIcon} />
              <span className={styles.linkText}>{submission.videoUrl}</span>
            </a>
          </div>
        </div>
      )}

      {submission.demoUrl && (
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Демо</div>
          <div className={styles.metaValue}>
            <a
              href={submission.demoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
              title={submission.demoUrl}
            >
              <LinkIcon size='sm' className={styles.linkIcon} />
              <span className={styles.linkText}>{submission.demoUrl}</span>
            </a>
          </div>
        </div>
      )}

      <div className={styles.metaItem}>
        <div className={styles.metaLabel}>Відправлено</div>
        <div className={styles.metaValue}>{formattedDate}</div>
      </div>
    </div>
  );
};
