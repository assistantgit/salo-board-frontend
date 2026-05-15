import { tournamentApi } from '@entities/tournament/api/tournament.api';
import type { JuryDto } from '@entities/tournament/model/tournament.types';
import { formatFullName } from '@entities/user/lib/formatFullName';
import { AddIcon, CloseIcon, PeopleIcon } from '@shared/ui/icons';
import { ActionInput } from '@shared/ui/inputs';
import { ConfirmModal } from '@shared/ui/modal/ConfirmModal';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './JuryManager.module.css';

interface JuryManagerProps {
  tournamentId: number;
  readOnly?: boolean;
}

export const JuryManager: React.FC<JuryManagerProps> = ({ tournamentId, readOnly = false }) => {
  const [items, setItems] = useState<JuryDto[]>([]);
  const [inviteCode, setInviteCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<JuryDto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await tournamentApi.getAdminJury(tournamentId);
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch jury members:', err);
    } finally {
      setIsLoading(false);
    }
  }, [tournamentId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    try {
      setIsSubmitting(true);
      setError(null);
      await tournamentApi.addJuryMember(tournamentId, inviteCode.trim());
      setInviteCode('');
      await fetchItems();
    } catch (err: unknown) {
      console.error('Failed to add jury member:', err);
      const e = err as { response?: { data?: { error?: string; detail?: string } } };
      const errorMsg =
        e.response?.data?.error ??
        e.response?.data?.detail ??
        'Не вдалося додати члена журі. Перевірте invite code.';
      setError(errorMsg);
      alert(`Помилка додавання журі: ${JSON.stringify(e.response?.data, null, 2)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await tournamentApi.removeJuryMember(tournamentId, deleteTarget.user);
      await fetchItems();
    } catch (err) {
      console.error('Failed to remove jury member:', err);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className={styles.form}>
      <header className={styles.headerTitle}>
        <h2 className={styles.title}>Члени журі</h2>
      </header>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <PeopleIcon size='sm' /> Поточний склад журі
        </h3>

        {isLoading ? (
          <p className={styles.emptyState}>Завантаження...</p>
        ) : items.length === 0 ? (
          <p className={styles.emptyState}>Журі поки не призначено</p>
        ) : (
          <div className={styles.juryGrid}>
            {items.map((item) => (
              <div key={item.id} className={styles.juryItem}>
                <div className={styles.juryCard}>
                  <PeopleIcon size='sm' className={styles.juryCardIcon} />
                  <div className={styles.juryCardInfo}>
                    <span className={styles.juryCardName}>
                      {formatFullName(item.firstName, item.lastName)}
                    </span>
                    <span className={styles.juryCardId}>ID: {item.user}</span>
                  </div>
                </div>
                {!readOnly && (
                  <button
                    type='button'
                    className={styles.deleteOverlay}
                    onClick={() => setDeleteTarget(item)}
                    title='Видалити члена журі'
                  >
                    <CloseIcon size='sm' />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {!readOnly && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <AddIcon size='sm' /> Запросити члена журі
          </h3>

          <form className={styles.addForm} onSubmit={handleAdd}>
            <div className={styles.addInputRow}>
              <ActionInput
                label='Invite code журі'
                placeholder='Введіть invite code'
                props={{
                  value: inviteCode,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setInviteCode(e.target.value),
                  onKeyDown: handleKeyDown,
                }}
              />
              <button
                type='submit'
                className={styles.addBtn}
                disabled={isSubmitting || !inviteCode.trim()}
                title='Запросити журі'
              >
                <AddIcon size='sm' />
              </button>
            </div>
            {error && <p className={styles.errorMsg}>{error}</p>}
          </form>
        </section>
      )}

      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        message={`Видалити ${formatFullName(deleteTarget?.firstName, deleteTarget?.lastName)} зі складу журі?`}
        subMessage='Цю дію неможливо відмінити.'
        confirmLabel='Видалити'
        isLoading={isDeleting}
      />
    </div>
  );
};
