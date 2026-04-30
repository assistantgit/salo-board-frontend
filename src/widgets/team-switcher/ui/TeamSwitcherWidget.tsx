import { useState } from 'react';
import { Pagination, Divider, DefaultButton } from '@shared/ui';
import { getInitials } from '@shared/lib';
import { useAuthStore } from '@entities/user';
import styles from './TeamSwitcherWidget.module.css';

export const TeamSwitcherWidget = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const currentUser = useAuthStore((s) => s.userName);
  const currentUserName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Ви';

  const mockMembers = [
    { id: 1, name: 'Ахалай Махалай1', role: 'Lead', isYou: false },
    { id: 2, name: currentUserName, role: '', isYou: true },
    { id: 3, name: '', role: '', isYou: false },
    { id: 4, name: '', role: '', isYou: false },
  ];

  const teamTitle = ''; // напр., 'NaVi'
  const tournamentTitle = ''; // напр., 'IEM Katowice 2026'

  return (
    <div className={styles.widget}>
      <header className={styles.header}>
        <div className={styles.titles}>
          <h3 className={styles.teamTitle}>
            Склад команди - {teamTitle ? ` — ${teamTitle}` : ''}
          </h3>
          <span className={styles.tournamentTitle}>
            {tournamentTitle || '\u00A0'}
          </span>
        </div>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
          className={styles.pagination}
        />
      </header>

      <Divider className={styles.divider} margin="16px 0 24px 0" />

      <div className={styles.membersRow}>
        {mockMembers.map((member) => {
          const initials = member.name ? getInitials(member.name) : '?';

          return (
            <div 
              key={member.id} 
              className={`${styles.memberCard} ${!member.name ? styles.memberCardEmpty : ''}`}
            >
              {member.name ? (
                <>
                  {member.role === 'Lead' && (
                    <span className={`${styles.badge} ${styles.badgeLead}`}>Lead</span>
                  )}
                  {member.isYou && (
                    <span className={`${styles.badge} ${styles.badgeYou}`}>You</span>
                  )}
                  
                  <div className={styles.avatarWrapper}>
                    <div className={styles.avatar}>{initials}</div>
                  </div>
                  <span className={styles.memberName}>{member.name}</span>
                </>
              ) : (
                <>
                  <div className={styles.avatarWrapper}>
                    <div className={styles.avatarEmpty}>?</div>
                  </div>
                  <span className={styles.memberNameEmpty}>Очікування гравця...</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <DefaultButton className={styles.exitButton}>Вийти з команди</DefaultButton>
      </div>
    </div>
  );
};
