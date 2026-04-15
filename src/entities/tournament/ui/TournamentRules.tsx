import React from 'react';
import { ContentBlock } from '@shared/ui';
import styles from './TournamentTextBlock.module.css';

interface TournamentRulesProps {
  rules: string;
  className?: string;
  id?: string;
}

/**
 * TournamentRules — Entity UI component.
 * Renders the tournament rules with line breaks.
 */
export const TournamentRules: React.FC<TournamentRulesProps> = ({
  rules,
  className,
  id
}) => {
  if (!rules) return null;

  return (
    <ContentBlock title="Правила турніру" className={className} id={id}>
      <div className={styles.textBlock}>
        {rules.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </ContentBlock>
  );
};
