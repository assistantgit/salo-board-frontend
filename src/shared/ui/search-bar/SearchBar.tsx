import React, { type InputHTMLAttributes, useRef } from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import './SearchBar.css';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * If true, renders a visual skeleton/plug instead of an interactive input.
   */
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  isLoading = false,
  className = '',
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
      <div className={`search-bar search-bar--skeleton ${className}`} aria-hidden="true">
        <div className="search-bar__icon-skeleton" />
        <div className="search-bar__text-skeleton" />
      </div>
    );
  }

  return (
    <div className={`search-bar ${className}`} onClick={handleContainerClick}>
      <SearchIcon className="search-bar__icon" />
      <input 
        ref={inputRef}
        type="text"
        className="search-bar__input"
        placeholder="Пошук турнірів"
        {...props}
      />
    </div>
  );
};
