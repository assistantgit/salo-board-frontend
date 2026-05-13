import { roundApi } from '@entities/tournament/api/roundApi';
import type { RoundDto } from '@entities/tournament/model/tournament.types';
import { AddIcon } from '@shared/ui/icons';
import { ConfirmModal } from '@shared/ui/modal/ConfirmModal';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { RoundForm } from './RoundForm';
import styles from './RoundManager.module.css';

interface RoundManagerProps {
  tournamentId: number;
  readOnly?: boolean;
}

export const RoundManager: React.FC<RoundManagerProps> = ({ tournamentId, readOnly = false }) => {
  const [rounds, setRounds] = useState<RoundDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<RoundDto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchRounds = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await roundApi.getAdminRounds(tournamentId);
      setRounds(data.sort((a, b) => a.orderIndex - b.orderIndex));
    } catch (error) {
      console.error('Failed to fetch rounds:', error);
    } finally {
      setIsLoading(false);
    }
  }, [tournamentId]);

  useEffect(() => {
    fetchRounds();
  }, [fetchRounds]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      const deletedOrder = deleteTarget.orderIndex;

      // 1. Delete the target round
      await roundApi.deleteRound(tournamentId, deleteTarget.id);

      // 2. Identify rounds that need reordering from the current state
      const roundsToShift = rounds
        .filter((r) => r.id !== deleteTarget.id && r.orderIndex > deletedOrder)
        .sort((a, b) => a.orderIndex - b.orderIndex);

      // 3. Update their orderIndex sequentially
      for (const round of roundsToShift) {
        await roundApi.updateRound(tournamentId, round.id, {
          orderIndex: round.orderIndex - 1,
        });
      }

      await fetchRounds();
    } catch (error: any) {
      console.error('Failed to delete/reorder rounds:', error);
      const errorData = error.response?.data;
      alert(
        'Помилка при видаленні або зміні черговості раундів: ' +
          (errorData ? JSON.stringify(errorData, null, 2) : error.message),
      );
      await fetchRounds();
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Раунди турніру</h3>
        {!readOnly && !isAdding && (
          <button type='button' className={styles.addButton} onClick={() => setIsAdding(true)}>
            <AddIcon size='sm' />
            Додати раунд
          </button>
        )}
      </div>

      {isAdding && (
        <div className={styles.formCard}>
          <RoundForm
            tournamentId={tournamentId}
            onSuccess={() => {
              setIsAdding(false);
              fetchRounds();
            }}
            onCancel={() => setIsAdding(false)}
            initialOrderIndex={rounds.length}
          />
        </div>
      )}

      {isLoading ? (
        <p>Завантаження раундів...</p>
      ) : (
        <div className={styles.roundsList}>
          {rounds.map((round) => (
            <div key={round.id} className={styles.roundItem}>
              <RoundForm
                tournamentId={tournamentId}
                initialData={round}
                onSuccess={fetchRounds}
                onDelete={
                  readOnly || round.status !== 'DR' ? undefined : () => setDeleteTarget(round)
                }
                readOnly={readOnly || round.status !== 'DR'}
              />
            </div>
          ))}
          {rounds.length === 0 && !isAdding && (
            <div className={styles.empty}>Раунди ще не створені.</div>
          )}
        </div>
      )}

      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        message={`Видалити раунд "${deleteTarget?.title}"?`}
        subMessage='Разом з раундом буде видалено всі його матеріали, критерії та вимоги.'
        confirmLabel='Видалити раунд'
        isLoading={isDeleting}
      />
    </div>
  );
};
