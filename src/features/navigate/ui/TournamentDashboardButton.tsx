import { useNavigate } from 'react-router-dom';
import { NavButton } from '@shared/ui';
import { ArrowBackIcon } from '@shared/ui';
import styles from './TournamentDashboardButton.module.css';

interface TournamentDashboardButtonProps {
  className?: string;
}

export const TournamentDashboardButton = ({
  className = '',
}: TournamentDashboardButtonProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <NavButton
      icon={<ArrowBackIcon />}
      onClick={handleNavigate}
      className={`${styles.dashboardButton} ${className}`}
    >
      До головної
    </NavButton>
  );
};
