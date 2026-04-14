import React from 'react';
import styles from './ContentBlock.module.css';

interface ContentBlockProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

/**
 * Shared ContentBlock component.
 * Used for titled sections like "About Tournament", "Rules", etc.
 * 
 * Design Specs:
 * - Rectangle (aKyGo): border-radius: 25px, white bg, gray border
 * - Title (BIzWC): 20px, medium
 * - Divider (ENy0c): border-bottom
 */
export const ContentBlock: React.FC<ContentBlockProps> = ({
    title,
    children,
    className = '',
    id,
}) => {
    return (
        <section id={id} className={`${styles.block} ${className}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.divider} />
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </section>
    );
};
