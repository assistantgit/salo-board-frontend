import { ContentBlock, Skeleton } from '@shared/ui';
import { useCurrentTournament } from '../lib/useCurrentTournament';
import styles from './TournamentTextBlock.module.css';

interface TournamentRulesProps {
  className?: string;
  id?: string;
}

export const TournamentRules: React.FC<TournamentRulesProps> = ({ className, id }) => {
  const { tournament, isLoading } = useCurrentTournament();

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
        {tournament.rules.split('\n').map((line, index) => (
          <p key={`${line}-${index}`}>{line}</p>
        ))}
      </div>
    </ContentBlock>
  );
};
