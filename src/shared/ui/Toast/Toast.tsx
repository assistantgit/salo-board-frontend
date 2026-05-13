import { useEffect, useState } from 'react';
import { Portal } from '../portal/Portal';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast = ({ message, duration = 500, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <Portal>
      <div className={`${styles.toast} ${isVisible ? styles.visible : styles.hidden}`}>
        {message}
      </div>
    </Portal>
  );
};
