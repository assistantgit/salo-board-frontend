import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { CloseIcon } from '../icons';
import { Portal } from '../portal/Portal';
import styles from './Modal.module.css';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 180; // Should match --transition-fast in Modal.module.css

export const Modal = (props: ModalProps) => {
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

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMounted(true);
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen, onKeyDown]);

  const mods: Record<string, boolean | undefined> = {
    [styles.opened]: isOpen,
    [styles.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  const modalClassName = [
    styles.modal,
    className,
    ...Object.entries(mods)
      .filter(([, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');

  return (
    <Portal>
      <div className={modalClassName} role='dialog' aria-modal='true' tabIndex={-1}>
        <div className={styles.overlay} onClick={closeHandler}>
          <div className={styles.content} onClick={onContentClick}>
            {onClose && (
              <button
                type='button'
                className={styles.closeBtn}
                onClick={closeHandler}
                aria-label='Закрити'
              >
                <CloseIcon size='lg' />
              </button>
            )}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
