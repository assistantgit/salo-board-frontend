# Design-to-Code Workflow (FSD + SOLID)

## Overview

Pencil enables a two-way sync between design and code. This reference covers the workflow for generating clean, production-ready React code following Feature-Sliced Design (FSD) and SOLID principles.

**Target stack**: React, TypeScript, Vanilla CSS, FSD Architecture, Lucide icons.

## Step 1: Identify FSD Layer and Slice

Before generating any code, identify where the design fits in the project:

- **Shared**: Global UI primitives (buttons, inputs) → `src/shared/ui`
- **Entities**: Business domain objects (User, Tournament) → `src/entities/<name>`
- **Features**: User interactions (Login, Search) → `src/features/<name>`
- **Widgets**: Complex UI blocks (Header, LoginForm) → `src/widgets/<name>`
- **Pages**: Route compositions → `src/pages/<name>`

## Step 2: Read Design Tokens

```typescript
pencil_get_variables({ filePath: "path/to/file.pen" })
```

Map every Pencil variable to your project's CSS variables.
Key principle: **Pencil variable names map 1:1 to CSS tokens.**

| Pencil Variable | CSS Reference | Usage |
|----------------|---------------|-------|
| `primary` | `var(--primary)` | `background-color: var(--primary);` |
| `background` | `var(--background)` | `background: var(--background);` |
| `foreground` | `var(--foreground)` | `color: var(--foreground);` |
| `radius-md` | `var(--radius-md)` | `border-radius: var(--radius-md);` |

## Step 3: Analyze Component Segments

Following FSD + SOLID, split the functionality into segments:

| Segment | Responsibility | File Example |
|---------|----------------|--------------|
| `ui/` | Presentational components + CSS | `ComponentName.tsx`, `ComponentName.css` |
| `model/` | Logic, validation, stores (Zustand) | `selectors.ts`, `loginValidation.ts` |
| `api/` | HTTP client calls, DTO mapping | `componentApi.ts` |
| `lib/` | Pure helper functions | `formatDate.ts` |

## Step 4: Map Design Components to @shared/ui

Before creating new components, check if they exist in `@shared/ui`:

| Pencil Component | Project Component | Alias Import |
|------------------|-------------------|--------------|
| Button | `DefaultButton`, `IconButton` | `@shared/ui` |
| Input | `LoginInputField`, `PasswordInputField` | `@shared/ui` |
| Icon | `Icon` (Lucide wrapper) | `@shared/ui` |
| Banner | `AuthErrorBanner` | `@shared/ui` |

## Step 5: Generate Code (SOLID & FSD)

### 1. Component (ui/ segment)

```tsx
// widgets/login-form/ui/LoginForm.tsx
import React from "react"
import "./LoginForm.css"
import { DefaultButton, LoginInputField } from "@shared/ui"

export const LoginForm: React.FC = () => {
  // logic...
  return (
    <div className="login-container">
      <LoginInputField ... />
      <DefaultButton ... >Submit</DefaultButton>
    </div>
  )
}
```

### 2. Styles (ui/ segment)

```css
/* widgets/login-form/ui/LoginForm.css */
.login-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
}
```

### 3. Public API (index.ts)

Always export via the barrel file:

```typescript
// widgets/login-form/index.ts
export { LoginForm } from "./ui/LoginForm";
export type { LoginFormValues } from "./model/types";
```

## Step 6: Apply SOLID Principles

- **Single Responsibility**: If the component handles both API calls and rendering, move the API calls to an `api/` segment or a feature.
- **Open/Closed**: Use `ReactNode` props (slots) for components that need variation.
- **Dependency Inversion**: Pass behavior (like `onSubmit`) as props instead of hardcoding business logic inside `shared` UI.

## Layout Mapping (Pencil -> CSS)

| Pencil Property | CSS value |
|----------------|-----------|
| `layout: "vertical"` | `display: flex; flex-direction: column;` |
| `layout: "horizontal"` | `display: flex; flex-direction: row;` |
| `gap: 16` | `gap: var(--spacing-4);` |
| `padding: 24` | `padding: var(--spacing-6);` |
| `width: "fill_container"` | `width: 100%;` or `flex-grow: 1;` |

## Always Do

- Use FSD folder structure: `ui/`, `model/`, `api/`, `lib/`.
- Use `@shared/ui` for all atomic elements.
- Use CSS variables for all styles.
- Create an `index.ts` for every new slice/widget.
- Follow SOLID: keep components small and focused.

## Never Do

- Use hardcoded hex codes or pixel values.
- Import from brother siblings on the same layer (e.g., `features/A` imports `features/B`).
- Create "God-components" with 200+ lines of mixed logic and UI.
- Use direct paths instead of `@aliases`.
