import { NavButton } from '@shared/ui';
import { ArchiveIcon } from '@shared/ui';
import styles from './TournamentArchiveButton.module.css';

interface TournamentArchiveButtonProps {
  className?: string;
  onClick?: () => void;
}

export const TournamentArchiveButton = ({
  className = '',
  onClick
}: TournamentArchiveButtonProps) => {
  return (
    <NavButton
      icon={<ArchiveIcon />}
      onClick={onClick}
      className={`${styles.archiveButton} ${className}`}
    >
      Архів
    </NavButton>
  );
};
