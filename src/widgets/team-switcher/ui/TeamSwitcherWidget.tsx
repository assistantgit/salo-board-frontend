import { DefaultButton, Divider, Pagination } from '@shared/ui';
import { useState } from 'react';
import { TeamMemberList } from './TeamMemberList';
import styles from './TeamSwitcherWidget.module.css';

// Mock teams data with varying max sizes
const MOCK_TEAMS = [
  {
    id: 'team-1',
    name: 'Salo Power',
    tournament: 'Winter Cup 2024',
    maxSize: 4,
    members: [
      {
        id: '1-1',
        fullName: 'Kyrylo O. (Lead)',
        isLead: true,
        isCurrentUser: true,
        canBeDeleted: false,
      },
      { id: '1-2', fullName: 'Oleg S.', isLead: false, isCurrentUser: false, canBeDeleted: true },
      { id: '1-3', fullName: 'Dmytro K.', isLead: false, isCurrentUser: false, canBeDeleted: true },
      { id: '1-4', fullName: 'Ihor P.', isLead: false, isCurrentUser: false, canBeDeleted: true },
    ],
  },
  {
    id: 'team-large',
    name: 'Mega Squad',
    tournament: 'Large Scale Battle',
    maxSize: 6, // More than 4 participants
    members: [
      {
        id: 'L-1',
        fullName: 'Leader One',
        isLead: true,
        isCurrentUser: false,
        canBeDeleted: false,
      },
      {
        id: 'L-2',
        fullName: 'Member Two',
        isLead: false,
        isCurrentUser: false,
        canBeDeleted: true,
      },
      {
        id: 'L-3',
        fullName: 'Member Three',
        isLead: false,
        isCurrentUser: false,
        canBeDeleted: true,
      },
      {
        id: 'L-4',
        fullName: 'Member Four',
        isLead: false,
        isCurrentUser: false,
        canBeDeleted: true,
      },
      {
        id: 'L-5',
        fullName: 'Member Five',
        isLead: false,
        isCurrentUser: false,
        canBeDeleted: true,
      },
      {
        id: 'L-6',
        fullName: 'Member Six',
        isLead: false,
        isCurrentUser: false,
        canBeDeleted: true,
      },
    ],
  },
  {
    id: 'team-duo',
    name: 'Dynamic Duo',
    tournament: '2v2 Arena',
    maxSize: 2, // Only 2 participants, no empty slots expected
    members: [
      { id: 'D-1', fullName: 'Duo Lead', isLead: true, isCurrentUser: false, canBeDeleted: false },
      {
        id: 'D-2',
        fullName: 'Duo Partner',
        isLead: false,
        isCurrentUser: false,
        canBeDeleted: true,
      },
    ],
  },
  {
    id: 'team-empty',
    name: 'New Squad',
    tournament: 'Qualifications',
    maxSize: 4,
    members: [],
  },
  {
    id: 'team-waiting',
    name: 'Waiting Room',
    tournament: 'Winter Cup 2024',
    maxSize: 4,
    members: [
      {
        id: 'W-1',
        fullName: 'Waiting Lead',
        isLead: true,
        isCurrentUser: false,
        canBeDeleted: false,
      },
    ],
  },
];

/**
 * TeamSwitcherWidget - Orchestrates the team composition interface.
 * Supports dynamic team sizes and pagination.
 */
export const TeamSwitcherWidget: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = MOCK_TEAMS.length;

  const currentTeam = MOCK_TEAMS[currentPage - 1];

  const handleDeleteMember = (id: string) => {
    console.log('Delete member:', id);
  };

  const handleLeaveTeam = () => {
    console.log('Leave team from:', currentTeam.name);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className={styles['team-switcher']}>
      <header className={styles['team-switcher__header']}>
        <div className={styles['team-switcher__titles']}>
          <h2 className={styles['team-switcher__title']}>
            Склад команди —{' '}
            <span className={styles['team-switcher__team-name']}>{currentTeam.name}</span>
          </h2>
          <p className={styles['team-switcher__subtitle']}>{currentTeam.tournament}</p>
        </div>

        <div className={styles['team-switcher__controls']}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </header>

      <Divider />

      <main className={styles['team-switcher__content']}>
        <TeamMemberList
          members={currentTeam.members}
          maxSize={currentTeam.maxSize}
          onDeleteMember={handleDeleteMember}
        />
      </main>

      <footer className={styles['team-switcher__footer']}>
        <DefaultButton className={styles['team-switcher__leave-btn']} onClick={handleLeaveTeam}>
          Вийти з команди
        </DefaultButton>
      </footer>
    </section>
  );
};
