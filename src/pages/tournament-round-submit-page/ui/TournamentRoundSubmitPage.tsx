import { BGLayout } from '@widgets/bg-layout';
import { TournamentSubmissionWidget } from '@widgets/tournament-submission-widget';
import type React from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './TournamentRoundSubmitPage.module.css';

export const TournamentRoundSubmitPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <BGLayout bgConfig={BG_LAYOUT_CONFIG}>
        <TournamentSubmissionWidget />
      </BGLayout>
    </div>
  );
};
