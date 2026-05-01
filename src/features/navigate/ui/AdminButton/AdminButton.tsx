import { useUserRoles } from '@entities/tournament';
import { CodeIcon } from '@shared/ui/icons';
import { NavButton } from '@shared/ui/nav-buttons';
import { useNavigate } from 'react-router-dom';
import styles from './AdminButton.module.css';

interface AdminButtonProps {
  className?: string;
}

export const AdminButton = ({ className = '' }: AdminButtonProps) => {
  const navigate = useNavigate();
  const { rolesData, isLoading } = useUserRoles();

  // If loading or not an admin, don't show the button
  if (isLoading || !rolesData?.admin) {
    return null;
  }

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <NavButton
      type='button'
      icon={<CodeIcon />}
      className={`${styles.adminBtn} ${className}`}
      onClick={handleAdminClick}
    >
      Адмінпанель
    </NavButton>
  );
};
