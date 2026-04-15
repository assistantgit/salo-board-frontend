import React from 'react';
import { Pagination } from '@shared/ui';

interface TeamsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

/**
 * TeamsPagination feature - wraps the shared Pagination component
 * for use in the teams list context.
 */
export const TeamsPagination: React.FC<TeamsPaginationProps> = (props) => {
    return <Pagination {...props} />;
};
