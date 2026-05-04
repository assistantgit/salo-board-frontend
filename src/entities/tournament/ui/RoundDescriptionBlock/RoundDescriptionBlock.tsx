import { ContentBlock } from '@shared/ui';
import styles from './RoundDescriptionBlock.module.css';

interface RoundDescriptionBlockProps {
  description?: string | null;
}

export const RoundDescriptionBlock = ({ description }: RoundDescriptionBlockProps) => {
  return (
    <ContentBlock title='Завдання' isCollapsible initialOpen>
      <div className={styles.text}>{description || 'Опис завдання відсутній.'}</div>
    </ContentBlock>
  );
};
