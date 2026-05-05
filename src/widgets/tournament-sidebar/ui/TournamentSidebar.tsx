import { useRounds } from '@entities/tournament';
import { InfoIcon, PodiumIcon, SidebarLayout } from '@shared/ui';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useMyTournamentScores } from '../lib/useMyTournamentScores';
import { RoundSidebarCard } from './components/RoundSidebarCard/RoundSidebarCard';
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
    <SidebarLayout
      mobile={mobile}
      ariaLabel='Бічна панель турніру'
      className={styles.sidebar}
      desktopRootClassName={styles.desktopRoot}
      mobileRootClassName={styles.mobileRoot}
    >
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
            [...rounds]
              .sort((a, b) => a.orderIndex - b.orderIndex)
              .map((round, index) => {
                const active = location.pathname.includes(`/tournamentDetails/${round.id}`);
                const score = roundScoresMap[round.id];

                return (
                  <RoundSidebarCard
                    key={round.id}
                    round={round}
                    tournamentId={id ?? ''}
                    score={score}
                    active={active}
                    index={index}
                  />
                );
              })
          )}
        </nav>
      </section>
    </SidebarLayout>
  );
}

// ── Desktop sidebar wrapper ───────────────────────────────────────────────────

export function TournamentSidebar() {
  return <TournamentSidebarContent mobile={false} />;
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
