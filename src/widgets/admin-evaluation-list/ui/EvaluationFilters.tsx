import { TournamentCount } from '@entities/tournament';
import { SubmissionStatusTabs, useSubmissionFilterStore } from '@features/submission-filter';
import { FilterLayout } from '@shared/ui';
import { DropdownSelect } from '@shared/ui/dropdown-select';
import { CalendarIcon, GridIcon } from '@shared/ui/icons';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import styles from './EvaluationFilters.module.css';

const DEBOUNCE_MS = 300;

interface EvaluationFiltersProps {
  tournaments: { id: string; title: string }[];
  rounds: { id: string; title: string }[];
}

export const EvaluationFilters: React.FC<EvaluationFiltersProps> = ({ tournaments, rounds }) => {
  const search = useSubmissionFilterStore((s) => s.search);
  const setSearch = useSubmissionFilterStore((s) => s.setSearch);
  const status = useSubmissionFilterStore((s) => s.status);
  const tournamentId = useSubmissionFilterStore((s) => s.tournamentId);
  const setTournamentId = useSubmissionFilterStore((s) => s.setTournamentId);
  const roundId = useSubmissionFilterStore((s) => s.roundId);
  const setRoundId = useSubmissionFilterStore((s) => s.setRoundId);
  const count = useSubmissionFilterStore((s) => s.count);

  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(localSearch), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  const activeFiltersCount = useMemo(() => {
    let activeCount = 0;
    if (status !== 'ALL') activeCount++;
    if (tournamentId !== 'ALL') activeCount++;
    if (roundId !== 'ALL') activeCount++;
    return activeCount;
  }, [status, tournamentId, roundId]);

  const tournamentOptions = useMemo(() => {
    const options = tournaments.map((t) => ({
      value: t.id,
      label: t.title,
      icon: <GridIcon size='sm' />,
    }));
    return [{ value: 'ALL', label: 'Всі турніри', icon: <GridIcon size='sm' /> }, ...options];
  }, [tournaments]);

  const roundOptions = useMemo(() => {
    const options = rounds.map((r) => ({
      value: r.id,
      label: r.title,
      icon: <CalendarIcon size='sm' />,
    }));
    return [{ value: 'ALL', label: 'Всі раунди', icon: <CalendarIcon size='sm' /> }, ...options];
  }, [rounds]);

  const dropdowns = useMemo(
    () => (
      <div className={styles.filters}>
        <div className={styles.filterItem}>
          <span className={styles.mobileLabel}>Оберіть турнір</span>
          <DropdownSelect
            options={tournamentOptions}
            value={tournamentId}
            onChange={setTournamentId}
            placeholder='Всі турніри'
            className={styles.dropdown}
          />
        </div>
        <div className={styles.filterItem}>
          <span className={styles.mobileLabel}>Оберіть раунд</span>
          <DropdownSelect
            options={roundOptions}
            value={roundId}
            onChange={setRoundId}
            placeholder='Всі раунди'
            className={styles.dropdown}
            disabled={tournamentId === 'ALL'}
          />
        </div>
      </div>
    ),
    [tournamentOptions, tournamentId, setTournamentId, roundOptions, roundId, setRoundId],
  );

  return (
    <FilterLayout
      search={localSearch}
      onSearchChange={setLocalSearch}
      searchPlaceholder='Пошук за ім’ям судді'
      searchId='evaluation-search'
      activeFiltersCount={activeFiltersCount}
      extraContent={dropdowns}
      statusTabs={<SubmissionStatusTabs />}
      countBadge={<TournamentCount count={count} label='Оцінки' />}
    >
      {dropdowns}
    </FilterLayout>
  );
};
