import { useNavigate } from 'react-router-dom';
import { IconButton } from '@shared/ui/buttons';
import { ArrowBackIcon } from '@shared/ui/icons';
import styles from './NavigateBackButton.module.css';

interface NavigateBackButtonProps {
    className?: string;
    label?: string;
    onBack?: () => void;
}

export const NavigateBackButton = ({ className = '', label, onBack }: NavigateBackButtonProps) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <IconButton
            icon={<ArrowBackIcon />}
            onClick={handleBack}
            className={`${styles.backButton} ${className}`}
        >
            {label && <span className={styles.label}>{label}</span>}
        </IconButton>
    );
};
