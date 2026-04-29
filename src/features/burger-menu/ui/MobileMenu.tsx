import { CurrentUserAvatar } from '@features/user-avatar';
import { CloseIcon } from '@shared/ui';
import React, { type ReactNode, useEffect } from 'react';
import styles from './BurgerMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userFullName: string;
  onAvatarClick: () => void;
  children?: ReactNode;
  footer?: ReactNode;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  userFullName,
  onAvatarClick,
  children,
  footer,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleActionsClick = (e: React.MouseEvent) => {
    // If a link was clicked inside the actions, close the menu
    if ((e.target as HTMLElement).closest('a')) {
      onClose();
    }
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}>
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
          if (e.key === 'Enter' || e.key === ' ') onClose();
        }}
        role='button'
        tabIndex={0}
        aria-label='Закрити меню'
      />

      {/* Panel */}
      <aside className={styles.panel} role='dialog' aria-modal='true' aria-label='Меню'>
        {/* Header */}
        <header className={styles.panelHeader}>
          <span className={styles.panelTitle}>Меню </span>
          <button
            type='button'
            className={styles.closeBtn}
            onClick={onClose}
            aria-label='Закрити меню'
          >
            <CloseIcon size='lg' />
          </button>
        </header>

        {/* User info */}
        <div className={styles.userRow}>
          <CurrentUserAvatar size='lg' fullName={userFullName} onNavigate={onAvatarClick} />
          <button type='button' className={styles.userName} onClick={onAvatarClick}>
            {userFullName}
          </button>
        </div>

        {/* Actions */}
        {children && (
          <div
            className={styles.actions}
            onClick={handleActionsClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ')
                handleActionsClick(e as unknown as React.MouseEvent);
            }}
            role='none'
          >
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </aside>
    </div>
  );
};
