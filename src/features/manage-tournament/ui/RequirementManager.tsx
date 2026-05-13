import { roundApi } from '@entities/tournament/api/roundApi';
import type { RoundRequirementDto } from '@entities/tournament/model/tournament.types';
import { AddIcon, CloseIcon } from '@shared/ui/icons';
import { ActionInput } from '@shared/ui/inputs';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './NestedManager.module.css';

interface RequirementManagerProps {
  tournamentId: number;
  roundId: number;
  readOnly?: boolean;
}

export const RequirementManager: React.FC<RequirementManagerProps> = ({
  tournamentId,
  roundId,
  readOnly = false,
}) => {
  const [items, setItems] = useState<RoundRequirementDto[]>([]);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const data = await roundApi.getAdminRoundRequirements(tournamentId, roundId);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch requirements:', error);
    }
  }, [tournamentId, roundId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    try {
      setIsSubmitting(true);
      await roundApi.createRequirement(tournamentId, roundId, {
        text,
        orderIndex: items.length,
      });
      setText('');
      fetchItems();
    } catch (error: any) {
      console.error('Failed to add requirement:', error);
      alert(
        'Помилка додавання вимоги: ' +
          (error.response?.data ? JSON.stringify(error.response.data, null, 2) : error.message),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await roundApi.deleteRequirement(tournamentId, roundId, id);
      fetchItems();
    } catch (error: any) {
      console.error('Failed to delete requirement:', error);
      alert(
        'Помилка видалення вимоги: ' +
          (error.response?.data ? JSON.stringify(error.response.data, null, 2) : error.message),
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {items.length === 0 && readOnly && <p className={styles.emptyStateText}>Вимоги відсутні</p>}
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <span className={styles.itemLabel}>{item.text}</span>
            </div>
            {!readOnly && (
              <button
                type='button'
                className={styles.deleteBtn}
                onClick={() => handleDelete(item.id)}
              >
                <CloseIcon size='sm' />
              </button>
            )}
          </div>
        ))}
      </div>

      {!readOnly && (
        <div className={styles.addSection}>
          <div className={styles.addSectionHeader}>
            <AddIcon size='sm' />
            <span>Додати вимогу до подання</span>
          </div>
          <div className={styles.addForm}>
            <div className={styles.inputsRow}>
              <ActionInput
                label='Текст вимоги'
                placeholder='Напр. Посилання на GitHub репозиторій'
                props={{
                  value: text,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value),
                  onKeyDown: handleKeyDown,
                }}
              />
            </div>
            <button
              type='button'
              className={styles.addBtn}
              disabled={isSubmitting || !text}
              onClick={handleAdd as unknown as React.MouseEventHandler}
            >
              <AddIcon size='sm' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
