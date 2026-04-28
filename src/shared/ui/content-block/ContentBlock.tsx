import type React from 'react';
import { useState } from 'react';
import { ChevronDownIcon } from '../icons';
import styles from './ContentBlock.module.css';

interface ContentBlockProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  isCollapsible?: boolean;
  initialOpen?: boolean;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  children,
  className = '',
  id,
  isCollapsible = false,
  initialOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleToggle = () => {
    if (isCollapsible) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <section
      id={id}
      className={`${styles.block} ${className} ${isCollapsible ? styles.collapsible : ''}`}
    >
      <div
        className={`${styles.header} ${isCollapsible ? styles.headerInteractive : ''}`}
        onClick={handleToggle}
        role={isCollapsible ? 'button' : undefined}
        tabIndex={isCollapsible ? 0 : undefined}
        onKeyDown={(e) => {
          if (isCollapsible && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <div className={styles.headerTop}>
          <h2 className={styles.title}>{title}</h2>
          {isCollapsible && (
            <button
              className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnActive : ''}`}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Згорнути' : 'Розгорнути'}
              type='button'
            >
              <ChevronDownIcon size='md' />
            </button>
          )}
        </div>
        <div className={styles.divider} />
      </div>
      <div
        className={`${styles.contentWrapper} ${isOpen ? styles.contentVisible : styles.contentHidden}`}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
};
