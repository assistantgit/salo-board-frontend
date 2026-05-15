import { useUserRoles } from '@entities/tournament';
import { useAuthStore } from '@entities/user';
import { UserAvatar } from '@entities/user/ui/UserAvatar/UserAvatar';
import {
  BusinessIcon,
  CodeIcon,
  DiscordIcon,
  Divider,
  EmailIcon,
  InfoRow,
  LocationIcon,
  PersonIcon,
  TelegramIcon,
} from '@shared/ui';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserDetails.module.css';

export const UserDetails = () => {
  const { user } = useAuthStore();
  const { rolesData, isLoading: rolesLoading } = useUserRoles();

  const fullName = useMemo(() => (user ? `${user.firstName} ${user.lastName}`.trim() : ''), [user]);

  const canSeeJury = rolesData?.jury || rolesData?.admin;

  if (!user) return null;

  return (
    <div className={styles.card}>
      {/* ── Avatar section ── */}
      <div className={styles.avatarSection}>
        <UserAvatar fullName={fullName} size='2xl' className={styles.avatar} />
        <h2 className={styles.fullName}>{fullName || '—'}</h2>
      </div>

      <Divider margin='0' />

      {/* ── Info rows ── */}
      <div className={styles.infoList}>
        <InfoRow
          icon={<EmailIcon size='md' />}
          label='Пошта:'
          value={user.email ?? ''}
          isCopyable
        />

        <InfoRow icon={<PersonIcon size='md' />} label='ПІБ:' value={fullName} isCopyable />

        <InfoRow
          icon={<LocationIcon size='md' />}
          label='Місто:'
          value={user.city ?? ''}
          isCopyable
        />

        <InfoRow
          icon={<BusinessIcon size='md' />}
          label='Організація:'
          value={user.organization ?? ''}
          isCopyable
        />

        <InfoRow
          icon={<TelegramIcon size='md' />}
          label='Телеграм:'
          value={user.telegram ?? ''}
          isCopyable
        />

        <InfoRow
          icon={<DiscordIcon size='md' />}
          label='Діскорд:'
          value={user.discord ?? ''}
          isCopyable
        />

        <InfoRow
          icon={<CodeIcon size='md' />}
          label='Інвайт код:'
          value={user.inviteCode ?? ''}
          isCopyable
        />
      </div>

      {!rolesLoading && canSeeJury && (
        <div className={styles.actions}>
          <Link to='/jury/tournaments' className={styles.juryButton}>
            Перейти до оцінювання
          </Link>
        </div>
      )}
    </div>
  );
};
