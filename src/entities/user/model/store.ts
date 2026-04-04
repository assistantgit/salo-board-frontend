import { create } from 'zustand';
import type { UserProfileDto, UserShortProfileDto } from './types';

export interface AuthState {
  /** Поточний авторизований користувач або null */
  user: UserProfileDto | null;
  /** Ім'я та прізвище (зручно для хедеру) */
  userName: UserShortProfileDto | null;
  /** true — авторизований, false — гість */
  isAuth: boolean;
  /** true — перевірка токену ще не завершена (splash / перший mount) */
  isAuthInProgress: boolean;

  // actions
  setUser: (user: UserProfileDto) => void;
  setUserName: (name: UserShortProfileDto) => void;
  clearUser: () => void;
  setAuthInProgress: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userName: null,
  isAuth: false,
  isAuthInProgress: true, // за замовчуванням — чекаємо перевірки

  setUser: (user) => set({ user, userName: user, isAuth: true, isAuthInProgress: false }),
  setUserName: (userName) => set({ userName, isAuth: true, isAuthInProgress: false }),
  clearUser: () => set({ user: null, userName: null, isAuth: false, isAuthInProgress: false }),
  setAuthInProgress: (value) => set({ isAuthInProgress: value }),
}));
