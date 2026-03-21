---
trigger: manual
---

# FSD — Feature-Sliced Design Rules

> **Target stack**: React / TypeScript  
> **Methodology**: [Feature-Sliced Design v2](https://feature-sliced.design)  
> **Enforced by**: `eslint-plugin-boundaries`

---

## 1. Layer Stack (top → bottom)

```
src/
├── app/          # Bootstrap, providers, global styles, router
├── pages/        # Route-level compositions — no business logic
├── widgets/      # Self-contained UI blocks (header, sidebar, feed)
├── features/     # User interactions that bring value (auth, search, cart)
├── entities/     # Business objects (user, product, order)
├── shared/       # Reusable infra: ui-kit, lib, api, config, types
```

### Golden import rule — **upper layers import lower, never reverse**

```
app → pages → widgets → features → entities → shared
```

| Import direction | Status |
|---|---|
| `features/auth` → `entities/user` | ✅ allowed |
| `features/auth` → `shared/api` | ✅ allowed |
| `entities/user` → `features/auth` | ❌ forbidden |
| `shared/api` → `entities/product` | ❌ forbidden |
| `features/auth` → `features/cart` | ❌ forbidden (same layer) |
| `widgets/header` → `widgets/sidebar` | ❌ forbidden (same layer) |

---

## 2. Slice Anatomy

Each slice lives in its layer folder. Allowed segments:

```
features/auth/
├── ui/           # React components + CSS Modules
│   ├── LoginForm.tsx
│   └── LoginForm.module.css
├── model/        # Store, actions, selectors (Zustand / Effector / Redux)
│   ├── store.ts
│   └── selectors.ts
├── api/          # HTTP calls scoped to this slice
│   └── authApi.ts
├── lib/          # Pure helpers used only inside this slice
│   └── validateCredentials.ts
├── config/       # Constants, enums, feature-flags for this slice
│   └── constants.ts
└── index.ts      # ← PUBLIC API. The only file consumers may import.
```

### Public API contract

```ts
// features/auth/index.ts
export { LoginForm }     from './ui/LoginForm';
export { useAuthStore }  from './model/store';
export type { AuthUser } from './model/store';

// ❌ Never re-export internals
// export { validateCredentials } from './lib/validateCredentials';
// export { authApi }             from './api/authApi';
```

**Rule**: consumers always import from `features/auth`, never from  
`features/auth/ui/LoginForm` or `features/auth/model/store`.

---

## 3. Layer Responsibilities

### `app/`
- Entry point, React tree root
- Global providers (Router, QueryClient, ThemeProvider, i18n)
- Global CSS reset / design tokens
- No business logic, no feature-specific code

```ts
// app/index.tsx
export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </QueryClientProvider>
);
```

### `pages/`
- One folder per route
- Composition only — assemble widgets, pass URL params down
- No `useState`, no `useEffect`, no direct API calls
- May read route params and pass as props

```tsx
// pages/product-detail/ui/ProductDetailPage.tsx
const ProductDetailPage = () => {
  const { id } = useParams();
  return (
    <MainLayout>
      <ProductWidget id={id} />
      <RecommendationsWidget productId={id} />
    </MainLayout>
  );
};
```

### `widgets/`
- Stateful, self-contained UI blocks
- Composed from `features` + `entities` + `shared`
- Own their layout and internal state
- Used across multiple pages

### `features/`
- One feature = one user scenario
- May have local state, API calls, model logic
- Emits cross-feature side-effects via events (never direct imports)

### `entities/`
- Business domain objects: `User`, `Product`, `Order`
- UI components are **presentational**: accept data via props, no store access
- Model layer holds the entity store (single source of truth)
- API layer transforms DTOs → domain entities

### `shared/`
- Zero business logic
- Segment folders only — no slice sub-folders

```
shared/
├── ui/       # Design system primitives: Button, Input, Modal
├── api/      # Base HTTP client, interceptors, WebSocket factory
├── lib/      # Pure utils: date, string, validation, math
├── config/   # Env vars, feature flags, app-wide constants
├── types/    # Global TS types & utility types
├── i18n/     # Translation setup, locale helpers
└── router/   # Route name constants, typed navigation helpers
```

> Rule: anything used in 2+ slices across 2+ layers belongs in `shared/`.

---

## 4. Segment Rules

| Segment | What lives here | What never lives here |
|---|---|---|
| `ui/` | Components, render hooks, CSS | Business logic, fetch calls |
| `model/` | Store, actions, selectors, side-effects | HTTP calls, JSX |
| `api/` | fetch/axios calls, DTO mappers | State, JSX |
| `lib/` | Pure functions | Side effects, imports from other segments |
| `config/` | Constants, enums | Functions, classes |

---

## 5. Cross-Slice Communication

Same-layer slices **must not import each other**.  
Use one of three patterns:

### Pattern A — Event Bus (features ↔ features)

```ts
// shared/lib/eventBus.ts
import mitt from 'mitt';
type AppEvents = { 'user:logged-in': User; 'cart:cleared': void };
export const eventBus = mitt<AppEvents>();

// features/auth — producer
eventBus.emit('user:logged-in', user);

// features/analytics — consumer
eventBus.on('user:logged-in', user => trackLogin(user));
```

### Pattern B — Widget Composition (collocated UI)

```tsx
// widgets/Header — orchestrates features without them knowing each other
import { LoginButton } from 'features/auth';
import { CartIcon }    from 'features/cart';
import { SearchBar }   from 'features/search';

export const Header = () => (
  <header>
    <SearchBar />
    <CartIcon />
    <LoginButton />
  </header>
);
```

### Pattern C — Shared Entity Store (shared domain data)

```ts
// entities/user/model/store.ts — single source of truth
// features/auth  writes  → store.setUser(user)
// features/profile reads → store.user
// No direct feature-to-feature imports needed
```

---

## 6. Naming Conventions

| Artifact | Rule | Example |
|---|---|---|
| Layer / slice folder | `kebab-case` | `user-profile/` |
| Component file | `PascalCase.tsx` | `UserCard.tsx` |
| CSS Module | match component name | `UserCard.module.css` |
| Hook | `useCamelCase.ts` | `useAuthStore.ts` |
| Store file | `store.ts` | `store.ts` |
| Selectors file | `selectors.ts` | `selectors.ts` |
| API file | `<slice>Api.ts` | `authApi.ts` |
| Type / Interface | `PascalCase` | `AuthUser` |
| DTO type | `PascalCase` + `Dto` suffix | `AuthUserDto` |
| Test file | `*.test.ts(x)` | `LoginForm.test.tsx` |
| Public barrel | always `index.ts` | `index.ts` |

---

## 7. File Placement Decision Tree

```
Is it a new business object (User, Order, Product)?
  └─→ entities/<name>/

Is it a user action / scenario (login, add-to-cart, search)?
  └─→ features/<name>/

Is it a self-contained UI block used on multiple pages?
  └─→ widgets/<name>/

Is it a route / screen composition?
  └─→ pages/<route-name>/

Is it infra or used in 2+ layers?
  └─→ shared/<segment>/
```

---

## 8. State Placement Rules

```
Local UI toggle / form state    → useState       (ui/ segment)
Server data + async state       → React Query    (api/ segment hook)
Shared domain object state      → Zustand slice  (model/ segment)
Global config (theme, locale)   → app/model/
```

```ts
// ✅ features/cart/model/store.ts
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem:    (p: Product) => set(s => ({ items: [...s.items, p] })),
  removeItem: (id: string) => set(s => ({ items: s.items.filter(i => i.id !== id) })),
  total:      ()           => get().items.reduce((n, i) => n + i.price, 0),
}));
```

---

## 9. Testing by Layer

| Layer | Test type | Tool |
|---|---|---|
| `shared/lib` | Unit — pure functions | Vitest |
| `entities/model` | Unit — store logic | Vitest |
| `features` | Integration — model + mocked API | Vitest + MSW |
| `widgets` | Component — user interactions | RTL + Vitest |
| `pages` | E2E — full flows | Playwright |

```ts
// features/auth/ui/LoginForm.test.tsx
it('calls login on submit', async () => {
  const mockLogin = vi.fn();
  useAuthStore.setState({ login: mockLogin });
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
  await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
  expect(mockLogin).toHaveBeenCalledWith({ email: 'test@test.com' });
});
```

---

## 10. ESLint Boundary Enforcement

```jsonc
// .eslintrc.json  (requires eslint-plugin-boundaries)
{
  "plugins": ["boundaries"],
  "settings": {
    "boundaries/elements": [
      { "type": "app",      "pattern": "src/app/*" },
      { "type": "pages",    "pattern": "src/pages/*" },
      { "type": "widgets",  "pattern": "src/widgets/*" },
      { "type": "features", "pattern": "src/features/*" },
      { "type": "entities", "pattern": "src/entities/*" },
      { "type": "shared",   "pattern": "src/shared/*" }
    ]
  },
  "rules": {
    "boundaries/element-types": ["error", {
      "default": "disallow",
      "rules": [
        { "from": "app",      "allow": ["pages","widgets","features","entities","shared"] },
        { "from": "pages",    "allow": ["widgets","features","entities","shared"] },
        { "from": "widgets",  "allow": ["features","entities","shared"] },
        { "from": "features", "allow": ["entities","shared"] },
        { "from": "entities", "allow": ["shared"] },
        { "from": "shared",   "allow": [] }
      ]
    }]
  }
}
```

---

## 11. Anti-Patterns

| Anti-pattern | Why it hurts | Correct fix |
|---|---|---|
| `features/auth` imports `features/cart` | Same-layer coupling | Event bus or widget orchestration |
| Business logic in `pages/` | Pages are shells | Move to feature or entity |
| Store access in `entities/ui` | Breaks presentation | Pass data via props |
| Deep import: `features/auth/ui/LoginForm` | Bypasses public API | Import from `features/auth` |
| `shared/` imports a slice | Inverts dependency | Use DI / abstract interface |
| God-component > 300 LOC | Violates SRP | Split into segments |
| Missing `index.ts` barrel | Forces deep imports | Always add public API barrel |

---

## 12. Quick Cheatsheet

```
LAYERS (top → bottom):  app › pages › widgets › features › entities › shared
IMPORT DIRECTION:        upper → lower only, never reverse, never sideways
PUBLIC API:              always index.ts — never import internal paths
CROSS-SLICE:             event bus | widget composition | shared entity store
STATE:                   ui/ → useState | api/ → React Query | model/ → Zustand
TESTING:                 shared=unit | features=integration | pages=e2e
```

---