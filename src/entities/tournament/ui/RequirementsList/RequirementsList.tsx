import type { RoundRequirementDto } from '../../model/tournament.types';
import styles from './RequirementsList.module.css';

interface RequirementsListProps {
  requirements: RoundRequirementDto[];
  className?: string;
}

export const RequirementsList = ({ requirements, className }: RequirementsListProps) => {
  return (
    <ul className={`${styles.list} ${className || ''}`}>
      {requirements.map((req) => (
        <li key={req.id} className={styles.listItem}>
          <span className={styles.bullet}>•</span>
          {req.text}
        </li>
      ))}
    </ul>
  );
};
