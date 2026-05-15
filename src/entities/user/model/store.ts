import { userStorage } from '@shared/lib/storage/userStorage';
import { create } from 'zustand';
import type { UserProfileDto, UserRole, UserShortProfileDto } from './types';

export interface AuthState {
  /** Поточний авторизований користувач або null */
  user: UserProfileDto | null;
  /** Ім'я та прізвище (зручно для хедеру) */
  userName: UserShortProfileDto | null;
  /** true — авторизований, false — гість */
  isAuth: boolean;
  /** true — перевірка токену ще не завершена (splash / перший mount) */
  isAuthInProgress: boolean;
  /** Поточна роль користувача в інтерфейсі */
  role: UserRole;

  // actions
  setUser: (user: UserProfileDto) => void;
  setUserName: (name: UserShortProfileDto) => void;
  clearUser: () => void;
  setAuthInProgress: (value: boolean) => void;
  setRole: (role: UserRole) => void;
  fetchUser: () => Promise<void>;
}

const initialUserName = userStorage.getUserName();

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userName: initialUserName,
  isAuth: !!initialUserName, // Soft auth if name is persisted
  isAuthInProgress: true, // за замовчуванням — чекаємо перевірки
  role: 'viewer', // Початкова роль за замовчуванням

  setUser: (user) => {
    userStorage.setUserName(user);
    set({ user, userName: user, isAuth: true, isAuthInProgress: false });
  },
  setUserName: (userName) => {
    userStorage.setUserName(userName);
    set({ userName, isAuth: true, isAuthInProgress: false });
  },
  clearUser: () => {
    userStorage.clear();
    set({ user: null, userName: null, isAuth: false, isAuthInProgress: false, role: 'viewer' });
  },
  setAuthInProgress: (value: boolean) => set({ isAuthInProgress: value }),
  setRole: (role) => set({ role }),
  fetchUser: async () => {
    try {
      const { userApi } = await import('../api/userApi');
      const user = await userApi.getProfile();
      set({ user, userName: user, isAuth: true });
    } catch (e) {
      console.error('Failed to fetch user profile', e);
    }
  },
}));
