import styles from './RoundDates.module.css';

interface RoundDatesProps {
  startAt?: string;
  deadline?: string;
  label?: string;
  variant?: 'solid' | 'minimal';
  className?: string;
}

export const RoundDates = ({
  startAt,
  deadline,
  label,
  variant = 'minimal',
  className,
}: RoundDatesProps) => {
  if (!startAt && !deadline) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className={`${styles.datesContainer} ${styles[variant]} ${className || ''}`}>
      <div className={styles.dates}>
        {label && <span className={styles.label}>{label} </span>}
        {startAt ? formatDate(startAt) : ''}
        {startAt && deadline ? ' — ' : ''}
        {deadline ? formatDate(deadline) : ''}
      </div>
    </div>
  );
};
