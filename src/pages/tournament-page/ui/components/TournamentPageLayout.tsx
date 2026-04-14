import React from 'react';
import { Header } from "@widgets/header";
import { BGLayout } from "@widgets/bg-layout";
import { TOURNAMENT_BG_CONFIG } from "../constants";
import styles from './TournamentPageLayout.module.css';

interface TournamentPageLayoutProps {
  children: React.ReactNode;
}

/**
 * TournamentPageLayout — Shared shell for the tournament page.
 * Includes Header, Background, and main container.
 */
export function TournamentPageLayout({ children }: TournamentPageLayoutProps) {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <BGLayout bgConfig={TOURNAMENT_BG_CONFIG} className={styles.bgWrapper}>
        <main className={styles.mainContent}>
          <div className={styles.container}>
            {children}
          </div>
        </main>
      </BGLayout>
    </div>
  );
}
