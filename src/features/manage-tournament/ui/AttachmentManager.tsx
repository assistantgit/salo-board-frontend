import { roundApi } from '@entities/tournament/api/roundApi';
import type { RoundAttachmentDto } from '@entities/tournament/model/tournament.types';
import { AddIcon, CloseIcon, DocumentIcon } from '@shared/ui';
import { ActionInput } from '@shared/ui/inputs';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './NestedManager.module.css';

interface AttachmentManagerProps {
  tournamentId: number;
  roundId: number;
  readOnly?: boolean;
}

export const AttachmentManager: React.FC<AttachmentManagerProps> = ({
  tournamentId,
  roundId,
  readOnly = false,
}) => {
  const [items, setItems] = useState<RoundAttachmentDto[]>([]);
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const data = await roundApi.getAdminRoundAttachments(tournamentId, roundId);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch attachments:', error);
    }
  }, [tournamentId, roundId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !url) return;
    try {
      setIsSubmitting(true);
      await roundApi.createAttachment(tournamentId, roundId, {
        label,
        url,
        orderIndex: items.length,
      });
      setLabel('');
      setUrl('');
      fetchItems();
    } catch (error: any) {
      console.error('Failed to add attachment:', error);
      alert(
        'Помилка додавання вкладення: ' +
          (error.response?.data ? JSON.stringify(error.response.data, null, 2) : error.message),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await roundApi.deleteAttachment(tournamentId, roundId, id);
      fetchItems();
    } catch (error: any) {
      console.error('Failed to delete attachment:', error);
      alert(
        'Помилка видалення вкладення: ' +
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
      <div className={styles.attachmentList}>
        {items.length === 0 && readOnly && (
          <p className={styles.emptyStateText}>Вкладення відсутні</p>
        )}
        {items.map((item) => (
          <div key={item.id} className={styles.attachmentItem}>
            <a
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.attachmentCard}
            >
              <DocumentIcon className={styles.itemIcon} />
              <span className={styles.itemLabel}>{item.label}</span>
            </a>
            {!readOnly && (
              <button
                type='button'
                className={styles.deleteBtnOverlay}
                onClick={() => handleDelete(item.id)}
                title='Видалити'
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
            <span>Додати вкладення</span>
          </div>
          <div className={styles.addForm}>
            <div className={styles.inputsRow}>
              <ActionInput
                label='Назва (напр. Документ завдання)'
                placeholder='Введіть назву'
                props={{
                  value: label,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value),
                  onKeyDown: handleKeyDown,
                }}
              />
              <ActionInput
                label='URL'
                placeholder='https://...'
                type='url'
                props={{
                  value: url,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value),
                  onKeyDown: handleKeyDown,
                }}
              />
            </div>
            <button
              type='button'
              className={styles.addBtn}
              disabled={isSubmitting || !label || !url}
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
