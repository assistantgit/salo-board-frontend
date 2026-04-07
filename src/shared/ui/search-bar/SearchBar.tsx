import React, { type InputHTMLAttributes, useRef } from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import styles from './SearchBar.module.css';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * If true, renders a visual skeleton/plug instead of an interactive input.
   */
  isLoading?: boolean;
}

/**
 * Shared SearchBar component.
 * Follows SRP: only responsible for rendering the input field.
 * Placeholder and logic should be passed from features/widgets.
 */
export const SearchBar: React.FC<SearchBarProps> = ({ 
  isLoading = false,
  className = '',
  placeholder = 'Пошук...',
  ...props 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (isLoading) {
    return (
      <div className={`${styles.searchBar} ${styles.skeleton} ${className}`} aria-hidden="true">
        <div className={styles.iconSkeleton} />
        <div className={styles.textSkeleton} />
      </div>
    );
  }

  return (
    <div className={`${styles.searchBar} ${className}`} onClick={handleContainerClick}>
      <SearchIcon className={styles.icon} />
      <input 
        ref={inputRef}
        type="text"
        className={styles.input}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};
