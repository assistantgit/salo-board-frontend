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
      {isCollapsible ? (
        <button
          className={`${styles.header} ${styles.headerInteractive}`}
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            }
          }}
          type='button'
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Згорнути' : 'Розгорнути'}
        >
          <div className={styles.headerTop}>
            <h2 className={styles.title}>{title}</h2>
            <div className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnActive : ''}`}>
              <ChevronDownIcon size='md' />
            </div>
          </div>
          <div className={styles.divider} />
        </button>
      ) : (
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <div className={styles.divider} />
        </div>
      )}
      <div
        className={`${styles.contentWrapper} ${isOpen ? styles.contentVisible : styles.contentHidden}`}
      >
        <div className={styles.content}>
          <div className={styles.contentBody}>{children}</div>
        </div>
      </div>
    </section>
  );
};
