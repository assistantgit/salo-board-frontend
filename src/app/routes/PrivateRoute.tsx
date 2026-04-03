import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@entities/user/model/store';
import type { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
  /** Куди редиректити неавторизованого. Default: /login */
  redirectTo?: string;
}

/**
 * PrivateRoute — захищає приватні сторінки.
 *
 * Стани:
 * - isAuthInProgress = true  → показуємо splash (null), чекаємо відповіді сервера
 * - isAuth = true            → рендеримо дочірній контент
 * - isAuth = false           → редиректимо на /login
 */
export const PrivateRoute = ({ children, redirectTo = '/login' }: PrivateRouteProps) => {
  const { isAuth, isAuthInProgress } = useAuthStore();

  if (isAuthInProgress) {
    // Поки не знаємо — нічого не рендеримо (можна замінити на <SplashScreen />)
    return null;
  }

  if (!isAuth) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
