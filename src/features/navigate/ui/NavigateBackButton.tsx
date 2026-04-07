import { useNavigate } from 'react-router-dom';
import { NavButton } from '@shared/ui';
import { ArrowBackIcon } from '@shared/ui';
import styles from './NavigateBackButton.module.css';

interface NavigateBackButtonProps {
  className?: string;
  label?: string;
  onBack?: () => void;
}

export const NavigateBackButton = ({
  className = '',
  label,
  onBack
}: NavigateBackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <NavButton
      icon={<ArrowBackIcon />}
      onClick={handleBack}
      className={`${styles.backButton} ${className}`}
    >
      {label || 'Back'}
    </NavButton>
  );
};
