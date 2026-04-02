---
trigger: manual
---

# API Integration Rules — REST API + FSD + SOLID

> **Target stack**: React / TypeScript / Axios  
> **Architecture**: Feature-Sliced Design v2  
> **Base URL**: `/api`  
> **Auth**: JWT Bearer Token  

---

## 1. Золоте правило: де живе API-код

```
shared/api/      ← HTTP-клієнт, інтерцептори, базові типи
entities/*/api/  ← API-виклики доменних сутностей (user, tournament...)
features/*/api/  ← API-виклики, специфічні для конкретної фічі (auth)
```

**Заборонені виклики:**
```
❌ useEffect(() => { axios.get('/api/user') }, []) — у компоненті
❌ fetch('/api/login', ...)                        — напряму у фічі
❌ import { baseApi } from 'shared/api/baseApi'   — з pages/widgets (не пишеш нові ендпоінти тут)
```

**Дозволені виклики:**
```
✅ features/auth/api/authApi.ts   → import { baseApi } from '@shared/api/baseApi'
✅ entities/user/api/userApi.ts   → import { baseApi } from '@shared/api/baseApi'
✅ widgets/login-form/ui/...      → import { authApi } from '@features/auth/api/authApi'
```

---

## 2. shared/api — ядро HTTP-клієнта

### 2.1 baseApi.ts — єдиний Axios-instance

```ts
// shared/api/baseApi.ts
import axios, { type AxiosInstance } from 'axios';
import { tokenStorage } from '../lib/storage/tokenStorage';

export const baseApi: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});
```

**Правила:**
- `baseApi` — **єдиний** instance Axios у всьому проєкті. Не створюй нових.
- `baseURL` завжди `/api`. Шляхи в ендпоінтах — **без trailing slash** (`/login`, не `/login/`).
- Не додавай бізнес-логіку в `baseApi`. Тільки конфігурація + інтерцептори.

### 2.2 Request Interceptor — JWT-токен

```ts
baseApi.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Правило:** Токен завжди береться з `tokenStorage`, ніколи не передається вручну з компонента.

### 2.3 Response Interceptor — авто-refresh на 401

```ts
baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();

      if (refreshToken) {
        try {
          const { data } = await axios.post<{ access: string }>('/api/token/refresh', {
            refresh: refreshToken,
          });
          tokenStorage.setAccessToken(data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return baseApi(originalRequest);
        } catch {
          tokenStorage.clearTokens();
          window.dispatchEvent(new CustomEvent('auth:logout'));
        }
      }
    }

    return Promise.reject(error);
  }
);
```

**Правила:**
- Прапор `_retry: true` захищає від infinite loop (одна спроба refresh).
- Якщо refresh не вдався → очищуємо токени → емітуємо глобальну подію `auth:logout`.
- Refresh-запит виконується через сирий `axios`, а **не** через `baseApi` — щоб уникнути рекурсії.

---

## 3. shared/lib/storage/tokenStorage.ts — токени

```ts
const ACCESS_KEY  = 'sb_access_token';
const REFRESH_KEY = 'sb_refresh_token';

export const tokenStorage = {
  getAccessToken:  () => localStorage.getItem(ACCESS_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
  setAccessToken:  (token: string) => localStorage.setItem(ACCESS_KEY, token),
  setRefreshToken: (token: string) => localStorage.setItem(REFRESH_KEY, token),
  setTokens:       (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clearTokens: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};
```

**Правила:**
- Токени зберігаються **лише** через `tokenStorage`. Ніколи напряму `localStorage.setItem('token', ...)`.
- Ключі токенів — константи з префіксом `sb_` (назва проєкту).
- `tokenStorage` не знає про HTTP. Він лише читає / пише / видаляє.

---

## 4. shared/api/types.ts — базові типи

```ts
// shared/api/types.ts

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface ApiError {
  detail?: string;
  error?: string;
  [key: string]: unknown;
}
```

**Правила:**
- `shared/api/types.ts` містить лише типи, які **реально повертає бекенд**.
- Не додавай сюди UI-типи (наприклад, `isLoading`, `errorMessage`).
- Для кожного нового endpoint — спочатку окремий тип у відповідному `entities/*/api/` файлі, а в `shared/api/types.ts` — лише спільні (токени, помилки).

---

## 5. Структура API-файлу у slice

### 5.1 features/auth/api/authApi.ts

```ts
import { baseApi } from '@shared/api/baseApi';
import type { TokenResponse } from '@shared/api/types';
import { tokenStorage } from '@shared/lib/storage/tokenStorage';

export const authApi = {
  login: async (credentials: { email: string; password: string }): Promise<TokenResponse> => {
    const { data } = await baseApi.post<TokenResponse>('/login', credentials);
    tokenStorage.setTokens(data.access, data.refresh);
    return data;
  },

  register: async (userData: { email: string; password: string }): Promise<void> => {
    await baseApi.post('/register', userData);
  },

  logout: async (): Promise<void> => {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      if (refreshToken) await baseApi.post('/logout', { refresh: refreshToken });
    } finally {
      tokenStorage.clearTokens();
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
  },

  refresh: async (token: string): Promise<TokenResponse> => {
    const { data } = await baseApi.post<TokenResponse>('/token/refresh', { refresh: token });
    tokenStorage.setAccessToken(data.access);
    return data;
  },
};
```

### 5.2 entities/user/api/userApi.ts

```ts
import { baseApi } from '@shared/api/baseApi';
import type { UserProfileDto } from '../model/types';

export const userApi = {
  getProfile: async (): Promise<UserProfileDto> => {
    const { data } = await baseApi.get<UserProfileDto>('/user');
    return data;
  },

  updateProfile: async (payload: Partial<UserProfileDto>): Promise<UserProfileDto> => {
    const { data } = await baseApi.patch<UserProfileDto>('/user', payload);
    return data;
  },
};
```

**Правила шаблону:**
- Кожен метод — `async`, повертає `Promise<T>` з явним типом.
- Деструктуруй `{ data }` з відповіді axios: `const { data } = await baseApi.get(...)`.
- Ніколи не пиши `.then()` — лише `async/await`.
- Якщо endpoint не повертає тіло (204 No Content) → тип `Promise<void>`.

---

## 6. Підключення API до компонента (Widget/Feature)

### ❌ Заборонено
```tsx
// widgets/login-form/ui/LoginForm.tsx
import axios from 'axios';

const onSubmit = async (data) => {
  const res = await axios.post('/api/login', data); // ← ЗАБОРОНЕНО
};
```

### ✅ Правильно
```tsx
// widgets/login-form/ui/LoginForm.tsx
import { authApi } from '@features/auth/api/authApi';

const [isLoading, setIsLoading] = React.useState(false);
const [error, setError] = React.useState<string | null>(null);

const onSubmit = async (data: LoginFormValues) => {
  try {
    setIsLoading(true);
    setError(null);
    await authApi.login(data);
    navigate('/');
  } catch (err: unknown) {
    const e = err as { response?: { data?: { detail?: string } } };
    setError(e.response?.data?.detail ?? 'Помилка входу');
  } finally {
    setIsLoading(false);
  }
};
```

**Правила:**
- `isLoading` і `error` — завжди локальний `useState` у компоненті.
- Повідомлення про помилку береться з `err.response?.data?.detail` або `err.response?.data?.error`.
- Завжди `finally { setIsLoading(false) }` — щоб кнопка розблокувалась навіть при помилці.
- `disabled={isLoading}` на кнопці submit — обов'язково.
- `navigate('/')` після успішного виклику — лише у компоненті, не в API-файлі.

---

## 7. Типізація DTO

```ts
// entities/user/model/types.ts
export interface UserProfileDto {
  firstName: string;
  lastName: string;
  city?: string;
  organization?: string;
  telegram?: string;
  discord?: string;
}

// entities/tournament/model/types.ts
export interface TournamentDto {
  id: number;
  title: string;
  description: string;
  status: 'DR' | 'RG' | 'AC' | 'FN';
  startDate: string;
  regOpenAt: string;
  regCloseAt: string;
  minTeamSize: number;
  maxTeamSize: number;
}
```

**Правила:**
- Типи, що відповідають схемі API, мають суфікс `Dto`.
- Поля — `camelCase` (відповідно до того, як повертає бекенд у JSON).
- Enum-значення прописуються через Union-тип: `'DR' | 'RG'`.
- `Dto`-типи живуть у `entities/*/model/types.ts`, а **не** у `shared/api/types.ts`.

---

## 8. Vite Proxy — локальна розробка

```ts
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://your-backend-host.com',
      changeOrigin: true,
    },
  },
},
```

**Правила:**
- Proxy — лише для dev-режиму. В продакшні Vite не використовується.
- `baseURL: '/api'` у Axios залишається незмінним — proxy прозоро перенаправляє.
- Ніколи не hardcode повний URL бекенду в `baseApi`. Для продакшну — env-змінна.

---

## 9. Іменування файлів та функцій

| Артефакт | Правило | Приклад |
|---|---|---|
| API-файл у slice | `<domainName>Api.ts` | `authApi.ts`, `userApi.ts` |
| Метод API | `camelCase` дієслово | `getProfile`, `updateProfile`, `createTeam` |
| DTO-тип | `PascalCase` + `Dto` | `UserProfileDto`, `TournamentDto` |
| Тип запиту | `PascalCase` + `Request` | `LoginRequest`, `RegisterRequest` |
| Тип відповіді | `PascalCase` + `Response` | `TokenResponse`, `LogoutResponse` |

---

## 10. Anti-Patterns — що ніколи не робити

| Anti-pattern | Чому погано | Правильно |
|---|---|---|
| `axios.get()` напряму у компоненті | Порушує FSD, неможливо перевикористати | Виклик через API-файл слайсу |
| Другий `axios.create()` у фічі | Дублювання, немає інтерцепторів | Завжди `baseApi` з `@shared` |
| `localStorage.setItem('token', ...)` | Порушує ізоляцію | `tokenStorage.setTokens(...)` |
| `any` у типах API | TypeScript не захищає від помилок | Явний `Dto`-тип |
| `console.log(data)` замість типізації | Не продакшн-код | Типізовані `Promise<T>` |
| Trailing slash у шляху `/user/` | `404` якщо бекенд не налаштований | `/user` відповідно до OpenAPI |
| `.catch()` замість `try/catch` | Важче читати, складніше `finally` | `async/await` + `try/catch/finally` |
| Зберігати токен у Zustand/Redux | Токен у store = XSS ризик | `localStorage` через `tokenStorage` |
