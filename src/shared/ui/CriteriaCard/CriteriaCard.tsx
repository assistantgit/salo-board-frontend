import styles from './CriteriaCard.module.css';

interface CriteriaCardProps {
  title: string;
  weight: number;
  maxPoints: number;
  score?: number;
  description?: string;
  className?: string;
  isActive?: boolean;
}

export const CriteriaCard = ({
  title,
  weight,
  maxPoints,
  score,
  description,
  className,
  isActive,
}: CriteriaCardProps) => {
  return (
    <div className={`${styles.card} ${isActive ? styles.active : ''} ${className}`}>
      <h4 className={styles.title}>{title}</h4>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.footer}>
        <div className={styles.metaGroup}>
          <span className={styles.meta}>Вага: {weight.toFixed(1)}</span>
          <span className={styles.divider}>•</span>
          <span className={styles.meta}>Макс: {maxPoints}</span>
        </div>
        {score !== undefined && <span className={styles.score}>{score} б.</span>}
      </div>
    </div>
  );
};
