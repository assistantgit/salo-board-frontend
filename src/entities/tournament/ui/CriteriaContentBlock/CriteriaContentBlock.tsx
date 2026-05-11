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
              <span className={styles.itemTitle}>
                {crit.title} ({crit.maxScore} балів)
              </span>
              <span className={styles.itemCategory}> — {crit.category}</span>
            </div>
          ))
        )}
      </div>
    </ContentBlock>
  );
};
