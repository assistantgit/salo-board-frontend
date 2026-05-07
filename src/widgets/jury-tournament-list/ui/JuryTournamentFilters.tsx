import type { RoundDto, TournamentDomain } from '@entities/tournament';
import { DropdownSelect } from '@shared/ui/dropdown-select';
import { CalendarIcon, GridIcon, PodiumIcon } from '@shared/ui/icons';
import type React from 'react';
import { useMemo } from 'react';
import styles from './JuryTournamentFilters.module.css';

interface JuryTournamentFiltersProps {
  tournaments: TournamentDomain[];
  rounds: RoundDto[];
  selectedTournamentId: string | undefined;
  onTournamentChange: (id: string | undefined) => void;
  selectedRoundId: string | undefined;
  onRoundChange: (id: string | undefined) => void;
}

export const JuryTournamentFilters: React.FC<JuryTournamentFiltersProps> = ({
  tournaments,
  rounds,
  selectedTournamentId,
  onTournamentChange,
  selectedRoundId,
  onRoundChange,
}) => {
  const tournamentOptions = useMemo(() => {
    const options = tournaments.map((t) => ({
      value: t.id.toString(),
      label: t.title,
      icon: <PodiumIcon size='sm' />,
    }));
    return [{ value: 'ALL', label: 'Всі турніри', icon: <GridIcon size='sm' /> }, ...options];
  }, [tournaments]);

  const roundOptions = useMemo(() => {
    if (!selectedTournamentId || selectedTournamentId === 'ALL') {
      return [{ value: 'ALL', label: 'Всі раунди', icon: <CalendarIcon size='sm' /> }];
    }
    const options = rounds.map((r) => ({
      value: r.id.toString(),
      label: r.title,
      icon: <CalendarIcon size='sm' />,
    }));
    return [{ value: 'ALL', label: 'Всі раунди', icon: <CalendarIcon size='sm' /> }, ...options];
  }, [rounds, selectedTournamentId]);

  return (
    <div className={styles.filters}>
      <div className={styles.filterItem}>
        <span className={styles.mobileLabel}>Оберіть турнір</span>
        <DropdownSelect
          options={tournamentOptions}
          value={selectedTournamentId || 'ALL'}
          onChange={onTournamentChange}
          placeholder='Оберіть турнір'
          className={styles.dropdown}
        />
      </div>
      <div className={styles.filterItem}>
        <span className={styles.mobileLabel}>Оберіть раунд</span>
        <DropdownSelect
          options={roundOptions}
          value={selectedRoundId || 'ALL'}
          onChange={onRoundChange}
          placeholder='Оберіть раунд'
          className={styles.dropdown}
          disabled={!selectedTournamentId || selectedTournamentId === 'ALL'}
        />
      </div>
    </div>
  );
};
