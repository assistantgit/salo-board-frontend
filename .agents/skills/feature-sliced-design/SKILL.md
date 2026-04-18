---
name: feature-sliced-design
description: Apply Feature-Sliced Design (FSD), SOLID, and strict API standards to Salo Board project. Use for organizing structure, creating components/slices, and enforcing architectural boundaries.
---

# Feature-Sliced Design (FSD) Skill — Salo Board Edition

An architectural methodology skill specifically tailored for the **Salo Board** project, enforcing Feature-Sliced Design (FSD), SOLID principles, and local CSS token standards.

## Core Architectural Rules

### 1. The Strict FSD Hierarchy
Every module belongs to exactly one layer. Import direction is strictly **top → bottom**.

```typescript
app/          ← Entry point, providers, global styles (@app/*)
pages/        ← Composition only — NO logic, NO direct API (@pages/*)
widgets/      ← Stateful UI blocks, composition of features/entities (@widgets/*)
features/     ← Reusable user actions/scenarios (@features/*)
entities/     ← Business domain objects and stores (@entities/*)
shared/       ← Infrastructure: ui-kit, api, lib (@shared/*)
```

**Golden Rule**: `app` → `pages` → `widgets` → `features` → `entities` → `shared`. 
- Sideways imports (between slices of the same layer) are **forbidden**.
- `pages` layer MUST be pure composition (assemble widgets/features, pass route params).

### 2. Technical Segments (The Slice Anatomy)
Each slice in `entities`, `features`, or `widgets` should follow this structure:

```
slice/
├── ui/           ← React components + CSS Modules
├── model/        ← Zustand store, actions, selectors
├── api/          ← Axios-based API calls (AxiosInstance from @shared)
├── lib/          ← Internal utilities/helpers
├── config/       ← Constants/Enums
└── index.ts      ← PUBLIC API (Barrel file)
```

**Public API Rule**: Consumers MUST import from the slice root (`@features/auth`), NEVER from internals (`@features/auth/ui/LoginForm`).

---

## Technical Standards

### API Integration (`@shared/api`)
- **Base Client**: Always use `baseApi` from `@shared/api/baseApi`. Never create new instances.
- **Token Handling**: Use `tokenStorage` from `@shared/lib/storage`. No direct `localStorage`.
- **Naming**:
    - DTOs (Backend types): `PascalCase` + `Dto` suffix (e.g., `TournamentDto`).
    - API Methods: `camelCase` verb (e.g., `getProfile`).
- **Placement**:
    - Domain API: `entities/<domain>/api/`.
    - Feature logic: `features/<feature>/api/`.

### CSS & Styling (`code-style.md`)
- **Local Tokens**: No global color variables. Declare colors inside the component's CSS.
  ```css
  .container {
    --card-bg: #fff; /* Local token */
  }
  ```
- **Dark Mode**: Scope dark overrides in the same file.
  ```css
  html[data-theme='dark'] .container {
    --card-bg: #000;
  }
  ```
- **Fluid Design**: Use `clamp()` for fonts, paddings, and widths.

### SOLID Principles (`solid.md`)
- **S — SRP**: Separate concern into segments. UI renders, API fetches, Model stores.
- **O — OCP**: Use **Slots** (`actions?: ReactNode`, `children`) for extension.
- **D — DIP**: Depend on `HttpClient` abstraction in `@shared/api`.

---

## Decision Framework: "Where does this go?"

1.  **Is it a business object (User, Tournament)?** → `entities/<name>/`
2.  **Is it a user action / scenario (Login, CreateTeam)?** → `features/<name>/`
3.  **Is it a self-contained block (Header, Sidebar)?** → `widgets/<name>/`
4.  **Is it infra or a UI primitive (Button, Input)?** → `shared/` (no slices here)
5.  **Is it a route screen?** → `pages/<route>/` (Keep it pure!)

## Checklist for Implementation

- [ ] Does `index.ts` export the public API?
- [ ] Are API calls using `baseApi`?
- [ ] Are colors declared as local CSS variables?
- [ ] Is `pages/` free of business logic/useEffect?
- [ ] Are we using `@app/*`, `@shared/*` instead of relative paths?
- [ ] Is the DTO correctly named (e.g. `UserDto`)?
- [ ] Are we using `clamp()` for responsive values?

## See Also
- [api-integration.md](references/api-integration.md) — Detailed API rules.
- [css-architecture.md](references/css-architecture.md) — Detailed styling rules.
- [solid-fsd-patterns.md](references/solid-fsd-patterns.md) — SOLID mapping in React/FSD.
