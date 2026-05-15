import { useEvaluationParams } from '@entities/evaluation';
import { BGLayout } from '@widgets/bg-layout';
import { EvaluationPanel } from '@widgets/evaluation-panel';
import { Header } from '@widgets/header';
import { RoundDescription } from '@widgets/round-description';
import { SubmissionInfoCard } from '@widgets/submission-info-card';
import type React from 'react';

import { EVALUATION_BG_CONFIG } from '../config/bgConfig';
import styles from './EvaluateSubmissionPage.module.css';

export const EvaluateSubmissionPage: React.FC = () => {
  const { tournamentId, roundId, submissionId } = useEvaluationParams();

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <BGLayout bgConfig={EVALUATION_BG_CONFIG} className={styles.bgWrapper}>
        <main className={styles.main}>
          <div className={styles.layout}>
            {/* LEFT: Submission details */}
            <aside className={styles.leftCol}>
              <SubmissionInfoCard
                tournamentId={tournamentId}
                roundId={roundId}
                submissionId={submissionId}
                isAdmin={false}
              />
            </aside>

            {/* CENTER: Round task, criteria, requirements, attachments */}
            <section className={styles.centerCol}>
              <RoundDescription
                tournamentId={tournamentId}
                roundId={roundId}
                withCriteria
                isAdmin={false}
              />
            </section>

            {/* RIGHT: Scoring panel */}
            <aside className={styles.rightCol}>
              <EvaluationPanel
                tournamentId={tournamentId}
                roundId={roundId}
                submissionId={submissionId}
              />
            </aside>
          </div>
        </main>
      </BGLayout>
    </div>
  );
};
