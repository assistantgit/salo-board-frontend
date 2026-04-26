import styles from './CriteriaCard.module.css';

interface CriteriaCardProps {
  title: string;
  weight: number;
  maxPoints: number;
  description?: string;
  className?: string;
  isActive?: boolean;
}

export const CriteriaCard = ({
  title,
  weight,
  maxPoints,
  description,
  className,
  isActive
}: CriteriaCardProps) => {
  return (
    <div className={`${styles.card} ${isActive ? styles.active : ''} ${className}`}>
      <h4 className={styles.title}>{title}</h4>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.footer}>
        <span className={styles.meta}>
          Вага: {weight.toFixed(1)}
        </span>
        <span className={styles.divider}>•</span>
        <span className={styles.meta}>
          Макс: {maxPoints} балів
        </span>
      </div>
    </div>
  );
};
