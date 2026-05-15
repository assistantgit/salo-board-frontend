import { ArchiveIcon, NavButton } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import styles from './TournamentArchiveButton.module.css';

interface TournamentArchiveButtonProps {
  className?: string;
}

export const TournamentArchiveButton = ({ className = '' }: TournamentArchiveButtonProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/tournaments/archive');
  };
  return (
    <NavButton
      icon={<ArchiveIcon />}
      onClick={handleNavigate}
      className={`${styles.archiveButton} ${className}`}
    >
      Архів
    </NavButton>
  );
};
