# 🏆 Salo Board Frontend

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/Biome-2.4.13-F8C43F.svg?style=for-the-badge&logo=biome)](https://biomejs.dev/)
[![FSD](https://img.shields.io/badge/Architecture-FSD-green.svg?style=for-the-badge)](https://feature-sliced.design/)

> Современный frontend-проект для турнирной платформы Salo Board, построенный на базе React, Vite и архитектурной методологии Feature-Sliced Design (FSD).

## 🚀 Технологический стек

- **Core:** React 19, Vite, TypeScript
- **State Management:** Zustand (локальный стейт), TanStack React Query (серверный стейт)
- **Routing:** React Router v7
- **Forms & Validation:** React Hook Form
- **API Client:** Axios
- **Code Quality:** Biome, Husky, lint-staged
- **Testing:** Vitest, Testing Library

---

## ⚙️ Требования (Prerequisites)

Перед началом убедитесь, что у вас установлены необходимые программы. Если вы настраиваете проект с абсолютного нуля, скачайте и установите их по ссылкам:
- **Node.js** (рекомендуется v20.x или выше) — [Скачать Node.js с официального сайта](https://nodejs.org/) *(выбирайте версию LTS)*
- **Git** (система контроля версий) — [Скачать Git](https://git-scm.com/downloads)

*(Вместе с установкой Node.js на ваш компьютер автоматически установится `npm` - менеджер пакетов, который нужен для следующего шага)*

---

## 🛠 Установка и запуск (Local Development)

### 1. Клонирование репозитория
```bash
git clone https://github.com/your-repo/salo-board-frontend.git
cd salo-board-frontend
```

### 2. Установка зависимостей
Установите все необходимые пакеты. Проект использует `npm`:
```bash
npm install
```

### 3. Настройка переменных окружения

Для корректной работы проекта нужно указать адрес бэкенда (сервера). Для этого:

1. Создайте в корневой папке проекта файл с названием `.env.local` (или скопируйте существующий пример командой `cp .env.example .env.local`).
2. Откройте созданный файл `.env.local` в любом текстовом редакторе (например, в VS Code или Блокноте) и вставьте туда конфигурацию.

**Пример содержимого файла `.env.local`:**
```env
# Адрес вашего локального или тестового бэкенда
VITE_API_URL=http://localhost:3000/api

# Пример, если бэкенд уже запущен в интернете:
# VITE_API_URL=https://api.saloboard.com/api
```
*(Убедитесь, что прописан корректный URL, иначе фронтенд не сможет получать данные)*

### 4. Запуск локального сервера
Запустите приложение в режиме разработки:
```bash
npm run dev
```
После запуска приложение будет доступно по адресу [http://localhost:5173](http://localhost:5173) (или по порту, указанному Vite).

---

## 🏗 Архитектура проекта (Feature-Sliced Design)

Проект строго следует методологии **Feature-Sliced Design (FSD)**. Код разделен на независимые модули по слоям:

```text
src/
├── app/       # Инициализация приложения, провайдеры, глобальные стили
├── pages/     # Компоненты страниц, роутинг (напр. AdminTeamsPage)
├── widgets/   # Самостоятельные и полноценные блоки (напр. Header, ManageTeamWidget)
├── features/  # Бизнес-логика и действия пользователя (напр. LeaveTeamButton)
├── entities/  # Бизнес-сущности, API, модели стейта (напр. User, Tournament)
└── shared/    # Переиспользуемый код: UI-кит, утилиты, хуки, типы, API-инстансы
```

**Особые правила разработки:**
- **Изоляция:** Слой может импортировать зависимости только из нижележащих слоев.
- **Работа с API:** Вся работа с API (axios) инкапсулируется внутри директорий `api` на слое `entities` или `features`. Запрещено использовать axios напрямую внутри UI-компонентов!
- **Серверный стейт:** Для запросов и мутаций данных используйте исключительно **React Query**.

---

## 📜 Доступные скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск локального сервера для разработки с HMR |
| `npm run build` | Оптимизированная сборка проекта для production |
| `npm run preview` | Локальный запуск собранного production-билда для проверки |
| `npm run check` | Линтинг и проверка кода (Biome) |
| `npm run format` | Автоматическое форматирование кода (Biome) |
| `npm run type-check` | Проверка типов TypeScript (без генерации файлов) |
| `npm run check-all` | Полная проверка (Lint + Types) |
| `npm run test` | Запуск unit и UI тестов через Vitest |
| `npm run test:ui` | Запуск тестов в визуальном UI-режиме |

---

## 🧪 Тестирование

Для написания и запуска тестов используется **Vitest** в связке с **Testing Library** (jsdom).

```bash
# Обычный запуск тестов
npm run test

# Запуск тестов с интерфейсом Vitest UI
npm run test:ui
```

---

## 🤝 Контрибьютинг (Git Workflow & Hooks)

В проекте настроены **Husky** и **lint-staged**. При выполнении коммита (`git commit`) автоматически запускаются пре-коммит хуки:
1. Быстрая проверка типов измененных файлов.
2. Проверка и авто-форматирование кода через Biome.

Это гарантирует высокое качество кода еще до отправки в удаленный репозиторий. Убедитесь, что ваш код соответствует правилам проекта и локально проходит проверки.

---

*Сделано с ❤️ для платформы Salo Board.*
