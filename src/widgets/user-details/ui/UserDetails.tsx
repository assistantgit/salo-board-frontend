import { useMemo } from 'react';
import { useAuthStore } from '@entities/user';
import { UserAvatar } from '@entities/user/ui/UserAvatar/UserAvatar';
import {
  Divider,
  InfoRow,
  EmailIcon,
  PersonIcon,
  BusinessIcon,
  TelegramIcon,
  DiscordIcon,
  LocationIcon,
} from '@shared/ui';
import styles from './UserDetails.module.css';


export const UserDetails = () => {
  const { user } = useAuthStore();

  const fullName = useMemo(
    () => (user ? `${user.firstName} ${user.lastName}`.trim() : ''),
    [user],
  );

  if (!user) return null;

  return (
    <div className={styles.card}>
      {/* ── Avatar section ── */}
      <div className={styles.avatarSection}>
        <UserAvatar fullName={fullName} size="2xl" className={styles.avatar} />
        <h2 className={styles.fullName}>{fullName || '—'}</h2>
      </div>

      <Divider margin="0" />

      {/* ── Info rows ── */}
      <div className={styles.infoList}>
        <InfoRow
          icon={<EmailIcon size="md" />}
          label="Пошта:"
          value={user.email ?? ''}
        />

        <InfoRow
          icon={<PersonIcon size="md" />}
          label="ПІБ:"
          value={fullName}
        />

        <InfoRow
          icon={<LocationIcon size="md" />}
          label="Місто:"
          value={user.city ?? ''}
        />

        <InfoRow
          icon={<BusinessIcon size="md" />}
          label="Організація:"
          value={user.organization ?? ''}
        />

        <InfoRow
          icon={<TelegramIcon size="md" />}
          label="Телеграм:"
          value={user.telegram ?? ''}
        />

        <InfoRow
          icon={<DiscordIcon size="md" />}
          label="Діскорд:"
          value={user.discord ?? ''}
        />
      </div>
    </div>
  );
};
