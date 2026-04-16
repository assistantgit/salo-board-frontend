import { ContentBlock, Skeleton } from '@shared/ui';
import styles from './TournamentTextBlock.module.css';
import { useCurrentTournament } from '../lib/useCurrentTournament';

interface TournamentDescriptionProps {
  className?: string;
}

export const TournamentDescription: React.FC<TournamentDescriptionProps> = ({
  className
}) => {
  const { tournament, isLoading } = useCurrentTournament();

  if (isLoading) {
    return (
      <ContentBlock title="Про турнір" className={className}>
        <Skeleton.Text lines={4} lineHeight={20} gap={12} />
      </ContentBlock>
    );
  }

  if (!tournament?.description) return null;

  return (
    <ContentBlock title="Про турнір" className={className}>
      <p className={styles.textBlock}>{tournament.description}</p>
    </ContentBlock>
  );
};
