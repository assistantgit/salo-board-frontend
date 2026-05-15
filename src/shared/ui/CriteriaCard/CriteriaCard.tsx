import { CHART_COLORS } from '@shared/config';
import styles from './CriteriaCard.module.css';

interface CriteriaCardProps {
  title: string;
  category?: string;
  weight: number;
  maxPoints: number;
  score?: number;
  description?: string;
  className?: string;
  isEvaluated?: boolean;
  orderIndex?: number;
}

export const CriteriaCard = ({
  title,
  category,
  weight,
  maxPoints,
  score,
  description,
  className,
  isEvaluated,
  orderIndex = 0,
}: CriteriaCardProps) => {
  const color = CHART_COLORS[orderIndex % CHART_COLORS.length];
  return (
    <div className={`${styles.card} ${className || ''}`}>
      <div className={styles.header}>
        {category && <span className={styles.category}>{category}</span>}
      </div>
      <h4 className={styles.title}>{title}</h4>
      {description && <p className={styles.description}>{description}</p>}

      {isEvaluated ? (
        <div className={styles.evaluatedContent}>
          <div className={styles.scoreRow}>
            <span className={styles.scoreText} style={{ color }}>
              {score ?? 0}/{maxPoints}
            </span>
            <span className={styles.weightPill}>Вага: x{weight}</span>
          </div>
          <div className={styles.progressBarBg}>
            <div
              className={styles.progressBarFill}
              style={{
                width: `${Math.min(100, Math.max(0, ((score ?? 0) / maxPoints) * 100))}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.footer}>
          <div className={styles.metaGroup}>
            <span className={styles.meta}>Вага: x{weight}</span>
            <span className={styles.divider}>•</span>
            <span className={styles.meta}>Макс: {maxPoints}</span>
          </div>
        </div>
      )}
    </div>
  );
};
