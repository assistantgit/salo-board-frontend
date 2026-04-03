import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@entities/user/model/store';
import './UserProfilePage.css';

export function UserProfilePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="profile-page">
      <button className="profile-back" onClick={() => navigate(-1)}>← Назад</button>

      <div className="profile-card">
        <h1 className="profile-title">Профіль</h1>

        <div className="profile-field">
          <span className="profile-label">Ім'я</span>
          <span className="profile-value">{user.firstName || '—'}</span>
        </div>

        <div className="profile-field">
          <span className="profile-label">Прізвище</span>
          <span className="profile-value">{user.lastName || '—'}</span>
        </div>

        {user.email && (
          <div className="profile-field">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user.email}</span>
          </div>
        )}

        {user.username && (
          <div className="profile-field">
            <span className="profile-label">Username</span>
            <span className="profile-value">{user.username}</span>
          </div>
        )}

        {user.city && (
          <div className="profile-field">
            <span className="profile-label">Місто</span>
            <span className="profile-value">{user.city}</span>
          </div>
        )}

        {user.organization && (
          <div className="profile-field">
            <span className="profile-label">Організація</span>
            <span className="profile-value">{user.organization}</span>
          </div>
        )}

        {user.telegram && (
          <div className="profile-field">
            <span className="profile-label">Telegram</span>
            <span className="profile-value">{user.telegram}</span>
          </div>
        )}

        {user.discord && (
          <div className="profile-field">
            <span className="profile-label">Discord</span>
            <span className="profile-value">{user.discord}</span>
          </div>
        )}

        {user.inviteCode && (
          <div className="profile-field">
            <span className="profile-label">Invite-код</span>
            <span className="profile-value profile-invite">{user.inviteCode}</span>
          </div>
        )}
      </div>
    </div>
  );
}
