import React, { type ReactNode, useEffect } from 'react';
import { CloseIcon } from '@shared/ui';
import { CurrentUserAvatar } from '@features/user-avatar';
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

    return (
        <div
            className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        >
            {/* Backdrop */}
            <div className={styles.backdrop} onClick={onClose} />

            {/* Panel */}
            <aside
                className={styles.panel}
                role="dialog"
                aria-modal="true"
                aria-label="Меню"
            >
                {/* Header */}
                <header className={styles.panelHeader}>
                    <span className={styles.panelTitle}>Меню </span>
                    <button
                        className={styles.closeBtn}
                        onClick={onClose}
                        aria-label="Закрити меню"
                    >
                        <CloseIcon size="lg" />
                    </button>
                </header>

                {/* User info */}
                <div className={styles.userRow}>
                    <CurrentUserAvatar
                        size="lg"
                        fullName={userFullName}
                        onNavigate={onAvatarClick}
                    />
                    <span
                        className={styles.userName}
                        onClick={onAvatarClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onAvatarClick();
                            }
                        }}
                    >
                        {userFullName}
                    </span>
                </div>

                {/* Actions */}
                {children && (
                    <div className={styles.actions}>
                        {children}
                    </div>
                )}

                {/* Footer */}
                {footer && (
                    <footer className={styles.footer}>
                        {footer}
                    </footer>
                )}
            </aside>
        </div>
    );
};
