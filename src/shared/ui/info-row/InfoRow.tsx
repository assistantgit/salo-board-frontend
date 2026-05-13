import { type ReactNode, useState } from 'react';
import { copyToClipboard } from '../../lib/strings';
import { Toast } from '../Toast/Toast';
import styles from './InfoRow.module.css';

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
  isCopyable?: boolean;
}

export const InfoRow = ({ icon, label, value, className, isCopyable }: InfoRowProps) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    if (!isCopyable || !value) return;
    const success = await copyToClipboard(value);
    if (success) {
      setShowToast(true);
    }
  };

  return (
    <>
      <div
        className={`${styles.row} ${isCopyable ? styles.copyable : ''} ${className ?? ''}`}
        onClick={handleCopy}
        onKeyDown={(e) => e.key === 'Enter' && handleCopy()}
        role={isCopyable ? 'button' : undefined}
        tabIndex={isCopyable ? 0 : undefined}
        title={isCopyable ? 'Натисніть, щоб скопіювати' : undefined}
      >
        <span className={styles.icon} aria-hidden='true'>
          {icon}
        </span>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value || '—'}</span>
      </div>
      {showToast && <Toast message='Скопійовано!' onClose={() => setShowToast(false)} />}
    </>
  );
};
