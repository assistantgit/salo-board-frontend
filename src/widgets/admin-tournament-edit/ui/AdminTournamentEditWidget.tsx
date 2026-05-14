import { tournamentApi } from '@entities/tournament';
import type { TournamentDomain, TournamentDto } from '@entities/tournament/model/tournament.types';
import { JuryManager, RoundManager, TournamentForm } from '@features/manage-tournament';
import { ConfirmModal } from '@shared/ui/modal/ConfirmModal';
import { AdminPageLayout } from '@widgets/admin-page-layout';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminTournamentEditWidget.module.css';

interface AdminTournamentEditWidgetProps {
  id?: string;
}

export const AdminTournamentEditWidget: React.FC<AdminTournamentEditWidgetProps> = ({ id }) => {
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<TournamentDomain | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchTournament = async () => {
        try {
          const data = await tournamentApi.getTournamentById(Number(id));
          setTournament(data);
        } catch (error) {
          console.error('Failed to fetch tournament:', error);
          navigate('/admin/tournaments');
        } finally {
          setIsLoading(false);
        }
      };
      fetchTournament();
    }
  }, [id, navigate]);

  // Backend only allows editing if status is 'DR' (Draft)
  const isReadOnly = tournament ? tournament.status !== 'DR' : false;

  const handleSuccess = (newId: number) => {
    if (!id) {
      navigate(`/admin/tournaments/${newId}/edit`);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      setIsDeleting(true);
      await tournamentApi.deleteTournament(Number(id));
      setIsDeleteModalOpen(false);
      navigate('/admin/tournaments');
    } catch (error) {
      console.error('Failed to delete tournament:', error);
      alert('Не вдалося видалити турнір.');
    } finally {
      setIsDeleting(false);
    }
  };

  const initialData: Partial<TournamentDto> | undefined = tournament
    ? {
        id: tournament.id,
        title: tournament.title,
        description: tournament.description,
        rules: tournament.rules,
        status: tournament.status,
        startDate: tournament.startDate.toISOString(),
        regOpenAt: tournament.regOpenAt.toISOString(),
        regCloseAt: tournament.regCloseAt.toISOString(),
        endedAt: tournament.endedAt.toISOString(),
        isTeamVisible: tournament.isTeamVisible,
        organizer: tournament.organizer,
        teamsCount: tournament.teamsCount ?? undefined,
        roundsCount: tournament.roundsCount,
        minTeamSize: tournament.minTeamSize,
        maxTeamSize: tournament.maxTeamSize,
        maxTeam: tournament.maxTeam,
      }
    : undefined;

  if (isLoading) {
    return (
      <AdminPageLayout title='Завантаження...' subtitle='Зачекайте, будь ласка' withBackButton>
        <div className={styles.loading}>Завантаження даних турніру...</div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title={id ? (isReadOnly ? 'Перегляд турніру' : 'Редагувати турнір') : 'Створити турнір'}
      subtitle={
        id
          ? isReadOnly
            ? `Перегляд (${tournament?.status}): ${tournament?.title}`
            : `Редагування: ${tournament?.title}`
          : 'Налаштуйте новий турнір SaloBoard'
      }
      withBackButton
    >
      <div className={styles.container}>
        <div className={styles.formSection}>
          <TournamentForm
            initialData={initialData}
            onSuccess={handleSuccess}
            onDelete={id ? () => setIsDeleteModalOpen(true) : undefined}
            readOnly={isReadOnly}
          />
        </div>

        {id && (
          <>
            <div className={styles.jurySection}>
              <JuryManager tournamentId={Number(id)} readOnly={isReadOnly} />
            </div>

            <div className={styles.roundsSection}>
              <RoundManager tournamentId={Number(id)} readOnly={isReadOnly} />
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message='Ви впевнені, що хочете видалити цей турнір?'
        subMessage="Цю дію неможливо скасувати. Всі пов'язані дані (команди, оцінки, сабміти) будуть видалені."
        confirmLabel='Видалити турнір'
        isLoading={isDeleting}
        icon='🗑️'
      />
    </AdminPageLayout>
  );
};
