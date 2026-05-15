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

  const Element = isCopyable ? 'button' : 'div';

  return (
    <>
      <Element
        className={`${styles.row} ${isCopyable ? styles.copyable : ''} ${className ?? ''}`}
        onClick={isCopyable ? handleCopy : undefined}
        onKeyDown={
          isCopyable ? (e: React.KeyboardEvent) => e.key === 'Enter' && handleCopy() : undefined
        }
        type={isCopyable ? 'button' : undefined}
        title={isCopyable ? 'Натисніть, щоб скопіювати' : undefined}
      >
        <span className={styles.icon} aria-hidden='true'>
          {icon}
        </span>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value || '—'}</span>
      </Element>
      {showToast && <Toast message='Скопійовано!' onClose={() => setShowToast(false)} />}
    </>
  );
};
