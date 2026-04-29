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
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>
            {isCollapsible ? (
              <button
                type='button'
                className={styles.headerTrigger}
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-controls={`${id}-content`}
              >
                {title}
                <div className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnActive : ''}`}>
                  <ChevronDownIcon size='md' />
                </div>
              </button>
            ) : (
              title
            )}
          </h2>
        </div>
        <div className={styles.divider} />
      </div>
      <div
        id={`${id}-content`}
        className={`${styles.contentWrapper} ${isOpen ? styles.contentVisible : styles.contentHidden}`}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
};
