import React from 'react';
import { ContentBlock } from '@shared/ui';
import styles from './TournamentTextBlock.module.css';

interface TournamentDescriptionProps {
  description: string;
  className?: string;
}

/**
 * TournamentDescription — Entity UI component.
 * Renders the tournament description inside a ContentBlock.
 */
export const TournamentDescription: React.FC<TournamentDescriptionProps> = ({ 
  description, 
  className 
}) => {
  if (!description) return null;

  return (
    <ContentBlock title="Про турнір" className={className}>
      <p className={styles.textBlock}>{description}</p>
    </ContentBlock>
  );
};
