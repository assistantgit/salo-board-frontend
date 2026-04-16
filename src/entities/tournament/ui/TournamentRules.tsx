import { ContentBlock, Skeleton } from '@shared/ui';
import styles from './TournamentTextBlock.module.css';
import { useCurrentTournament } from '../lib/useCurrentTournament';

interface TournamentRulesProps {
  className?: string;
  id?: string;
}

export const TournamentRules: React.FC<TournamentRulesProps> = ({
  className,
  id
}) => {
  const { tournament, isLoading } = useCurrentTournament();

  if (isLoading) {
    return (
      <ContentBlock title="Правила турніру" className={className} id={id}>
        <Skeleton.Text lines={6} lineHeight={20} gap={12} />
      </ContentBlock>
    );
  }

  if (!tournament?.rules) return null;

  return (
    <ContentBlock title="Правила турніру" className={className} id={id}>
      <div className={styles.textBlock}>
        {tournament.rules.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </ContentBlock>
  );
};
