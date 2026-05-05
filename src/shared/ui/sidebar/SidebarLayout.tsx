import type React from 'react';
import styles from './SidebarLayout.module.css';

interface SidebarLayoutProps {
  children: React.ReactNode;
  /** Custom className for the root element (aside on desktop, div on mobile) */
  className?: string;
  /** Custom className for the desktop inner container */
  desktopRootClassName?: string;
  /** Custom className for the mobile container */
  mobileRootClassName?: string;
  /** Whether to render in mobile mode (no aside wrapper, different padding) */
  mobile?: boolean;
  /** Accessibility label */
  ariaLabel?: string;
}

/**
 * Shared SidebarLayout component.
 * Provides a responsive container for sidebars (desktop aside vs mobile content).
 */
export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  className = '',
  desktopRootClassName = '',
  mobileRootClassName = '',
  mobile = false,
  ariaLabel,
}) => {
  if (mobile) {
    return (
      <section
        className={`${styles.mobileRoot} ${mobileRootClassName} ${className}`}
        aria-label={ariaLabel}
      >
        {children}
      </section>
    );
  }

  return (
    <aside className={`${styles.sidebar} ${className}`} aria-label={ariaLabel}>
      <div className={`${styles.desktopRoot} ${desktopRootClassName}`}>{children}</div>
    </aside>
  );
};
