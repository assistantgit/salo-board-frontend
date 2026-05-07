import { AddIcon, NavButton } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import styles from './CreateTournamentButton.module.css';

interface CreateTournamentButtonProps {
  className?: string;
}

export const CreateTournamentButton = ({ className = '' }: CreateTournamentButtonProps) => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/admin/tournaments/create');
  };

  return (
    <NavButton
      type='button'
      icon={<AddIcon size='lg' />}
      className={`${styles.createBtn} ${className}`}
      onClick={handleCreateClick}
    >
      Створити турнір
    </NavButton>
  );
};
