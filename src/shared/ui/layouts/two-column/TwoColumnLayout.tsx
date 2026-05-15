import type React from 'react';
import styles from './TwoColumnLayout.module.css';

interface TwoColumnLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftContent,
  rightContent,
  className = '',
}) => {
  return (
    <div className={`${styles.layout} ${className}`}>
      <div className={styles.leftColumn}>{leftContent}</div>
      <div className={styles.rightColumn}>{rightContent}</div>
    </div>
  );
};
