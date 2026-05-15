import { ContentBlock, Skeleton } from '@shared/ui';
import type React from 'react';
import { useMemo } from 'react';
import { useCurrentTournament } from '../lib/useCurrentTournament';
import styles from './TournamentTextBlock.module.css';

interface TournamentRulesProps {
  className?: string;
  id?: string;
}

export const TournamentRules: React.FC<TournamentRulesProps> = ({ className, id }) => {
  const { tournament, isLoading } = useCurrentTournament();

  const lines = useMemo(() => {
    if (!tournament?.rules) return [];
    return tournament.rules.split('\n').map((line, index) => ({
      id: `${line.substring(0, 10)}-${index}`,
      content: line,
    }));
  }, [tournament?.rules]);

  if (isLoading) {
    return (
      <ContentBlock
        title='Правила турніру'
        className={className}
        id={id}
        isCollapsible={true}
        initialOpen={true}
      >
        <Skeleton.Text lines={6} lineHeight={20} gap={12} />
      </ContentBlock>
    );
  }

  if (!tournament?.rules) return null;

  return (
    <ContentBlock
      title='Правила турніру'
      className={className}
      id={id}
      isCollapsible={true}
      initialOpen={true}
    >
      <div className={styles.textBlock}>
        {lines.map((line) => (
          <p key={line.id}>{line.content}</p>
        ))}
      </div>
    </ContentBlock>
  );
};
