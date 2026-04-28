import { ArrowBackIcon, ArrowForwardIcon } from '@shared/ui/icons';
import type React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  // Determine the number of dots (max 3)
  const numDots = Math.min(totalPages, 3);

  // Determine active dot index (0, 1, or 2)
  const activeIndex = currentPage === 1 ? 0 : currentPage === totalPages ? numDots - 1 : 1;

  const handleDotClick = (index: number) => {
    if (index === activeIndex) return; // Already active

    if (index === 0) {
      onPageChange(1);
    } else if (index === numDots - 1) {
      onPageChange(totalPages);
    } else {
      // Clicked middle dot
      if (currentPage === 1) onPageChange(2);
      else if (currentPage === totalPages) onPageChange(totalPages - 1);
    }
  };

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label='Pagination'>
      <button
        className={styles.arrowBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label='Previous page'
      >
        <ArrowBackIcon className={styles.arrowIcon} />
      </button>

      <div className={styles.dots}>
        {Array.from({ length: numDots }).map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Page indicator ${index + 1}`}
            aria-current={index === activeIndex ? 'page' : undefined}
          />
        ))}
      </div>

      <button
        className={styles.arrowBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label='Next page'
      >
        <ArrowForwardIcon className={styles.arrowIcon} />
      </button>
    </nav>
  );
};
