import { BGLayout } from '@widgets/bg-layout';
import { TournamentSubmissionWidget } from '@widgets/tournament-submission-widget';
import type React from 'react';
import styles from './TournamentRoundSubmitPage.module.css';

export const TournamentRoundSubmitPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <TournamentSubmissionWidget />
    </div>
  );
};
