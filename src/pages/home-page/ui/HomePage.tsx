import { useMemo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ThemeSwitcher } from '@widgets/theme-switcher';
import { BGLayout } from '@widgets/bg-layout';
import type { BGConfig } from '@shared/model';
import { SearchBar } from '@shared/ui';
import './HomePage.css';
import { Header } from '@widgets/header';
import { useAuthStore } from '@entities/user/model/store';
import { authApi } from '@features/auth';
import { RoleSwitcher } from '@features/role-switcher';

/**
 * Static BG config — defined outside component, reference is always stable.
 * To tweak ring colors: edit `--color-bg-layer-0/1/2` in globals.css.
 */
const HOME_BG_CONFIG: BGConfig = {
  circles: [
    {
      id: 'c1',
      xPercent: 15,
      yPercent: 25,
      ellipses: [
        { id: 'e1a', layer: 0, zIndex: 0, width: 420, height: 420, offsetX: 0, offsetY: 0, rotation: 0, borderRadius: '50%', borderWidth: 1.5 },
        { id: 'e1b', layer: 1, zIndex: 1, width: 280, height: 280, offsetX: 0, offsetY: 0, rotation: 15, borderRadius: '50%', borderWidth: 1 },
        { id: 'e1c', layer: 2, zIndex: 2, width: 140, height: 140, offsetX: 0, offsetY: 0, rotation: 30, borderRadius: '50%', borderWidth: 1 },
      ],
    },
    {
      id: 'c2',
      xPercent: 82,
      yPercent: 70,
      ellipses: [
        { id: 'e2a', layer: 0, zIndex: 0, width: 500, height: 500, offsetX: 0, offsetY: 0, rotation: 0, borderRadius: '50%', borderWidth: 1.5 },
        { id: 'e2b', layer: 1, zIndex: 1, width: 320, height: 320, offsetX: 0, offsetY: 0, rotation: -20, borderRadius: '50%', borderWidth: 1 },
        { id: 'e2c', layer: 2, zIndex: 2, width: 160, height: 160, offsetX: 0, offsetY: 0, rotation: 10, borderRadius: '50%', borderWidth: 1 },
      ],
    },
    {
      id: 'c3',
      xPercent: 50,
      yPercent: 90,
      ellipses: [
        { id: 'e3a', layer: 0, zIndex: 0, width: 300, height: 300, offsetX: 0, offsetY: 0, rotation: 5, borderRadius: '50%', borderWidth: 1 },
        { id: 'e3b', layer: 1, zIndex: 1, width: 180, height: 180, offsetX: 0, offsetY: 0, rotation: 25, borderRadius: '50%', borderWidth: 1 },
      ],
    },
  ],
};

export function HomePage() {
  const navigate = useNavigate();
  const bgConfig = useMemo(() => HOME_BG_CONFIG, []);
  const [searchValue, setSearchValue] = useState('');

  const { user, clearUser } = useAuthStore();

  const userFullName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : '';

  const handleLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleAvatarClick = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearUser();
      navigate('/login');
    }
  }, [clearUser, navigate]);

  return (
    <div>
      <Header
        userFullName={userFullName}
        onAvatarClick={handleAvatarClick}
        onLogout={handleLogout}
        onLogin={handleLogin}
      />
      <BGLayout bgConfig={bgConfig} className="home-page">
        {/* Commented out as per user request:
        <div className="home-page__theme-widget">
          <ThemeSwitcher />
        </div>
        */}

        <section className="home-page__hero">
        </section>

        <section className="home-page__search-section">
          <SearchBar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Пошук турнірів"
          />
          <RoleSwitcher />
        </section>
      </BGLayout>
    </div>
  );
}
