import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from '../portal/Portal';
import styles from './Drawer.module.css';

interface DrawerProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300; // Matches CSS transition

/**
 * Mobile Drawer (Bottom Sheet) component.
 * Slips up from the bottom on mobile devices.
 */
export const Drawer = (props: DrawerProps) => {
  const { className, children, isOpen, onClose, lazy } = props;

  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler],
  );

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onKeyDown]);

  if (lazy && !isMounted) {
    return null;
  }

  const drawerClassName = [
    styles.drawer,
    className,
    isOpen ? styles.opened : '',
    isClosing ? styles.isClosing : '',
  ].join(' ');

  return (
    <Portal>
      <div className={drawerClassName}>
        <button
          type='button'
          className={styles.overlay}
          onClick={closeHandler}
          aria-label='Закрити'
        />
        <div className={styles.content}>
          <button
            type='button'
            className={styles.handle}
            onClick={closeHandler}
            aria-label='Закрити'
          />
          {children}
        </div>
      </div>
    </Portal>
  );
};
