import { useRounds } from '@entities/tournament';
import { InfoIcon, PodiumIcon } from '@shared/ui';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useMyTournamentScores } from '../lib/useMyTournamentScores';
import styles from './TournamentSidebar.module.css';

// ── Types ─────────────────────────────────────────────────────────────────────

interface SidebarContentProps {
  /** Compact layout for mobile burger panel */
  mobile?: boolean;
}

// ── Shared content ────────────────────────────────────────────────────────────

export function TournamentSidebarContent({ mobile = false }: SidebarContentProps) {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { rounds, isLoading: roundsLoading } = useRounds(id);
  const { roundScoresMap, isLoading: scoresLoading } = useMyTournamentScores(id);

  const isOverview = location.pathname.includes('/overview');
  const isLeaderboard = location.pathname.includes('/leaderboard');
  const isLoading = roundsLoading || scoresLoading;

  return (
    <div className={mobile ? styles.mobileRoot : styles.desktopRoot}>
      {/* ── Primary nav ── */}
      <nav className={styles.nav} aria-label='Навігація турніру'>
        <Link
          to={`/tournaments/${id}/tournamentDetails/overview`}
          className={`${styles.navLink} ${isOverview ? styles.navLinkActive : ''}`}
        >
          <span className={styles.navIcon}>
            <InfoIcon />
          </span>
          <span className={styles.navLabel}>Основна інформація</span>
        </Link>

        <Link
          to={`/tournaments/${id}/leaderboard`}
          className={`${styles.navLink} ${isLeaderboard ? styles.navLinkActive : ''}`}
        >
          <span className={styles.navIcon}>
            <PodiumIcon />
          </span>
          <span className={styles.navLabel}>Таблиця лідерів</span>
        </Link>
      </nav>

      {/* ── Divider ── */}
      <div className={styles.divider} aria-hidden='true' />

      {/* ── Rounds ── */}
      <section className={styles.rounds}>
        <p className={styles.roundsHeading}>Раунди</p>

        <nav className={styles.roundsList} aria-label='Раунди'>
          {isLoading ? (
            <RoundSkeletons />
          ) : (
            rounds.map((round, index) => {
              const active = location.pathname.includes(`/tournamentDetails/${round.id}`);
              const score = roundScoresMap[round.id];
              const current = score?.teamRoundScore ?? 0;
              const max = score?.roundMaxScore ?? 0;
              const pct = max > 0 ? (current / max) * 100 : 0;
              const label = max > 0 ? `${current}/${max}` : null;

              return (
                <Link
                  key={round.id}
                  to={`/tournaments/${id}/tournamentDetails/${round.id}`}
                  className={`${styles.roundLink} ${active ? styles.roundLinkActive : ''}`}
                  aria-current={active ? 'page' : undefined}
                  style={{ '--index': index } as React.CSSProperties}
                >
                  <div className={styles.roundTop}>
                    <span className={styles.roundNumber}>РАУНД {round.orderIndex}</span>
                    <span className={styles.roundPercentage}>{Math.round(pct)}%</span>
                  </div>

                  <div className={styles.roundBottom}>
                    <div
                      className={styles.progressTrack}
                      role='progressbar'
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                    </div>
                    {label && <span className={styles.roundScore}>{label}</span>}
                  </div>
                </Link>
              );
            })
          )}
        </nav>
      </section>
    </div>
  );
}

// ── Desktop sidebar wrapper ───────────────────────────────────────────────────

export function TournamentSidebar() {
  return (
    <aside className={styles.sidebar} aria-label='Бічна панель турніру'>
      <TournamentSidebarContent mobile={false} />
    </aside>
  );
}

// ── Skeletons ─────────────────────────────────────────────────────────────────

function RoundSkeletons() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div key={i} className={styles.roundSkeleton} aria-hidden='true' />
      ))}
    </>
  );
}
