import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { SubmissionList } from '@widgets/jury-submit-list';
import type React from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './JurySubmissionsPage.module.css';

export const JurySubmissionsPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <BGLayout bgConfig={BG_LAYOUT_CONFIG}>
        <main className={styles.content}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Здані роботи</h1>
            <p className={styles.subtitle}>Список робіт для оцінювання</p>
          </div>
          <SubmissionList />
        </main>
      </BGLayout>
    </div>
  );
};
