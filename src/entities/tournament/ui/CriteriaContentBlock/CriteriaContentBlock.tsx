import { ContentBlock } from '@shared/ui';
import type React from 'react';
import type { EvaluationCriterionDto } from '../../model/tournament.types';
import styles from './CriteriaContentBlock.module.css';

interface CriteriaContentBlockProps {
  criteria: EvaluationCriterionDto[];
}

export const CriteriaContentBlock: React.FC<CriteriaContentBlockProps> = ({ criteria }) => {
  return (
    <ContentBlock title='Критерії оцінювання' isCollapsible initialOpen>
      <div className={styles.list}>
        {criteria.length === 0 ? (
          <div className={styles.empty}>Критерії оцінювання не визначені.</div>
        ) : (
          criteria.map((crit) => (
            <div key={crit.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <div className={styles.titleGroup}>
                  <h4 className={styles.itemTitle}>{crit.title}</h4>
                  <span className={styles.itemCategory}>{crit.category}</span>
                </div>
                <div className={styles.badgeGroup}>
                  <div className={styles.badge}>
                    <span className={styles.badgeLabel}>Макс. бал</span>
                    <span className={styles.badgeValue}>{crit.maxScore}</span>
                  </div>
                  <div className={`${styles.badge} ${styles.weightBadge}`}>
                    <span className={styles.badgeLabel}>Вага</span>
                    <span className={styles.badgeValue}>x{crit.weight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </ContentBlock>
  );
};
