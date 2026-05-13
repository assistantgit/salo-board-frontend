import { roundApi } from '@entities/tournament/api/roundApi';
import type { EvaluationCriterionDto } from '@entities/tournament/model/tournament.types';
import { AddIcon, CloseIcon } from '@shared/ui/icons';
import { ActionInput } from '@shared/ui/inputs';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './NestedManager.module.css';

interface CriterionManagerProps {
  tournamentId: number;
  roundId: number;
  readOnly?: boolean;
}

export const CriterionManager: React.FC<CriterionManagerProps> = ({
  tournamentId,
  roundId,
  readOnly = false,
}) => {
  const [items, setItems] = useState<EvaluationCriterionDto[]>([]);
  const [title, setTitle] = useState('');
  const [maxScore, setMaxScore] = useState('10');
  const [weight, setWeight] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const data = await roundApi.getAdminRoundCriterions(tournamentId, roundId);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch criteria:', error);
    }
  }, [tournamentId, roundId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    try {
      setIsSubmitting(true);
      await roundApi.createCriterion(tournamentId, roundId, {
        title,
        maxScore: Number(maxScore),
        weight: Number(weight),
        category: 'General',
        orderIndex: items.length,
      });
      setTitle('');
      setMaxScore('10');
      setWeight('1');
      fetchItems();
    } catch (error: any) {
      console.error('Failed to add criterion:', error);
      alert(
        'Помилка додавання критерію: ' +
          (error.response?.data ? JSON.stringify(error.response.data, null, 2) : error.message),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await roundApi.deleteCriterion(tournamentId, roundId, id);
      fetchItems();
    } catch (error: any) {
      console.error('Failed to delete criterion:', error);
      alert(
        'Помилка видалення критерію: ' +
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
        {items.length === 0 && readOnly && (
          <p className={styles.emptyStateText}>Критерії оцінювання не задані</p>
        )}
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <span className={styles.itemLabel}>{item.title}</span>
              <span className={styles.itemMeta}>
                Макс: {item.maxScore} бал. (Вага: {item.weight})
              </span>
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
            <span>Додати критерій оцінювання</span>
          </div>
          <div className={styles.addForm}>
            <div className={styles.inputsRow}>
              <ActionInput
                label='Назва критерію'
                placeholder='Напр. Дизайн'
                props={{
                  value: title,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
                  onKeyDown: handleKeyDown,
                }}
              />
              <ActionInput
                label='Макс. бал'
                type='number'
                placeholder='10'
                props={{
                  value: maxScore,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setMaxScore(e.target.value),
                  onKeyDown: handleKeyDown,
                }}
              />
              <ActionInput
                label='Вага'
                type='number'
                placeholder='1'
                props={{
                  value: weight,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setWeight(e.target.value),
                  onKeyDown: handleKeyDown,
                  min: 1,
                }}
              />
            </div>
            <button
              type='button'
              className={styles.addBtn}
              disabled={isSubmitting || !title}
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
