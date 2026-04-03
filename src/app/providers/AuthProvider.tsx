import { useEffect, type ReactNode } from 'react';
import { userApi } from '@entities/user';
import { useAuthStore } from '@entities/user/model/store';
import { tokenStorage } from '@shared/lib/storage/tokenStorage';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider — відновлює авторизацію при першому завантаженні додатку.
 *
 * Алгоритм:
 * 1. Якщо access token є → пробуємо GET /user (interceptor оновить його при 401)
 * 2. Якщо GET /user успішний → setUser → isAuth = true
 * 3. Якщо GET /user провалився (обидва токени протухли) → clearUser → isAuth = false
 * 4. Якщо access token взагалі відсутній → clearUser одразу (не йдемо на сервер)
 *
 * Поки isAuthInProgress = true — PrivateRoute показує splash/spinner.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const accessToken = tokenStorage.getAccessToken();

    if (!accessToken) {
      // Токену нема — точно не авторизований, одразу знімаємо прогрес
      clearUser();
      return;
    }

    userApi
      .getProfile()
      .then((profile) => {
        setUser(profile);
      })
      .catch(() => {
        // access + refresh протухли — чистимо storage
        tokenStorage.clearTokens();
        clearUser();
      });
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
};
