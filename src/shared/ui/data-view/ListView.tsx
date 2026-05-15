import type React from 'react';

interface ListViewProps<T> {
  data: T[];
  isLoading: boolean;
  renderItem: (item: T) => React.ReactNode;
  skeleton?: React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
}

/**
 * Generic ListView component.
 * Handles loading, empty, and data states automatically.
 * Part of the "Super-Puper" board engine.
 */
export const ListView = <T extends { id: string | number }>({
  data,
  isLoading,
  renderItem,
  skeleton,
  emptyState,
  className,
}: ListViewProps<T>) => {
  if (isLoading) {
    return <div className={className}>{skeleton}</div>;
  }

  if (data.length === 0) {
    return <>{emptyState}</>;
  }

  return <div className={className}>{data.map(renderItem)}</div>;
};
