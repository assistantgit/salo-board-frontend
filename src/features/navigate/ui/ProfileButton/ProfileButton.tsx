import { ArrowBackIcon, NavButton } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileButton.module.css';

interface ProfileButtonProps {
  className?: string;
}

/**
 * Кнопка переходу до профілю користувача.
 * Використовує NavButton для дотримання дизайн-коду проекту.
 */
export const ProfileButton = ({ className = '' }: ProfileButtonProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <NavButton
      icon={<ArrowBackIcon />}
      onClick={handleProfileClick}
      className={`${styles.profileBtn} ${className}`}
    >
      Профіль
    </NavButton>
  );
};
