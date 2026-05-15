# 🏆 Salo Board Frontend

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/Biome-2.4.13-F8C43F.svg?style=for-the-badge&logo=biome)](https://biomejs.dev/)
[![FSD](https://img.shields.io/badge/Architecture-FSD-green.svg?style=for-the-badge)](https://feature-sliced.design/)

> Сучасний frontend-проєкт для турнірної платформи Salo Board, побудований на базі React, Vite та архітектурної методології Feature-Sliced Design (FSD).

## 🚀 Технологічний стек

- **Core:** React 19, Vite, TypeScript
- **State Management:** Zustand (локальний стейт), TanStack React Query (серверний стейт)
- **Routing:** React Router v7
- **Forms & Validation:** React Hook Form
- **API Client:** Axios
- **Code Quality:** Biome, Husky, lint-staged
- **Testing:** Vitest, Testing Library

---

## ⚙️ Вимоги (Prerequisites)

Перед початком переконайтеся, що у вас встановлені необхідні програми. Якщо ви налаштовуєте проєкт з абсолютного нуля, завантажте та встановіть їх за посиланнями:
- **Node.js** (рекомендується v20.x або вище) — [Завантажити Node.js з офіційного сайту](https://nodejs.org/) *(обирайте версію LTS)*
- **Git** (система контролю версій) — [Завантажити Git](https://git-scm.com/downloads)

*(Разом із встановленням Node.js на ваш комп'ютер автоматично встановиться `npm` - менеджер пакетів, який потрібен для наступного кроку)*

---

## 🛠 Встановлення та запуск (Local Development)

### 1. Клонування репозиторію
```bash
git clone https://github.com/assistantgit/salo-board-frontend
cd salo-board-frontend
```

### 2. Встановлення залежностей
Встановіть всі необхідні пакети. Проєкт використовує `npm`:
```bash
npm install
```

### 3. Налаштування змінних середовища

Для коректної роботи проєкту потрібно вказати адресу бекенду (сервера). Для цього:

1. Створіть у кореневій папці проєкту файл з назвою `.env.local` (або скопіюйте існуючий приклад командою `cp .env.example .env.local`).
2. Відкрийте створений файл `.env.local` у будь-якому текстовому редакторі (наприклад, у VS Code або Блокноті) та вставте туди конфігурацію.

**Приклад вмісту файлу `.env.local`:**
```env
# Адреса бекенду (передається до nginx при старті контейнера через envsubst)
# Приклад: http://saloboard-backend.c0d2b785.nip.io
BACKEND_HOST=http://saloboard-backend.c0d2b785.nip.io
```
*(Переконайтеся, що прописано коректний URL, інакше фронтенд не зможе отримувати дані)*

### 4. Запуск локального сервера
Запустіть додаток у режимі розробки:
```bash
npm run dev
```
Після запуску додаток буде доступний за адресою [http://localhost:5173](http://localhost:5173) (або за портом, вказаним Vite).

---

## 🏗 Архітектура проєкту (Feature-Sliced Design)

Проєкт суворо дотримується методології **Feature-Sliced Design (FSD)**. Код розділений на незалежні модулі за шарами:

```text
src/
├── app/       # Ініціалізація додатку, провайдери, глобальні стилі
├── pages/     # Компоненти сторінок, роутинг (напр. AdminTeamsPage)
├── widgets/   # Самостійні та повноцінні блоки (напр. Header, ManageTeamWidget)
├── features/  # Бізнес-логіка та дії користувача (напр. LeaveTeamButton)
├── entities/  # Бізнес-сутності, API, моделі стейту (напр. User, Tournament)
└── shared/    # Код для повторного використання: UI-кіт, утиліти, хуки, типи, API-інстанси
```

**Особливі правила розробки:**
- **Ізоляція:** Шар може імпортувати залежності тільки з нижчих шарів.
- **Робота з API:** Вся робота з API (axios) інкапсулюється всередині директорій `api` на шарі `entities` або `features`. Заборонено використовувати axios безпосередньо всередині UI-компонентів!
- **Серверний стейт:** Для запитів та мутацій даних використовуйте виключно **React Query**.

---

## 📜 Доступні скрипти

| Команда | Опис |
|---------|------|
| `npm run dev` | Запуск локального сервера для розробки з HMR |
| `npm run build` | Оптимізована збірка проєкту для production |
| `npm run preview` | Локальний запуск зібраного production-білду для перевірки |
| `npm run check` | Лінтинг та перевірка коду (Biome) |
| `npm run format` | Автоматичне форматування коду (Biome) |
| `npm run type-check` | Перевірка типів TypeScript (без генерації файлів) |
| `npm run check-all` | Повна перевірка (Lint + Types) |
| `npm run test` | Запуск unit та UI тестів через Vitest |
| `npm run test:ui` | Запуск тестів у візуальному UI-режимі |

---

## 🧪 Тестування

Для написання та запуску тестів використовується **Vitest** у зв'язці з **Testing Library** (jsdom).

```bash
# Звичайний запуск тестів
npm run test

# Запуск тестів з інтерфейсом Vitest UI
npm run test:ui
```

---

## 🤝 Контриб'ютинг (Git Workflow & Hooks)

У проєкті налаштовані **Husky** та **lint-staged**. При виконанні коміту (`git commit`) автоматично запускаються пре-коміт хуки:
1. Швидка перевірка типів змінених файлів.
2. Перевірка та авто-форматування коду через Biome.

Це гарантує високу якість коду ще до відправлення у віддалений репозиторій. Переконайтеся, що ваш код відповідає правилам проєкту та локально проходить перевірки.

---

*Зроблено з ❤️ для платформи Salo Board.*