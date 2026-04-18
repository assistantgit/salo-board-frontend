# API Integration Standards

This reference guides API development within Salo Board slices, ensuring consistency with `shared/api`.

## 1. Directory Structure
API logic is strictly scoped within slices:
- `entities/*/api/`: Domain endpoints (e.g., `getTournament`).
- `features/*/api/`: Interaction endpoints (e.g., `login`).
- `shared/api/`: **Infrastructure ONLY** (`baseApi.ts`, global types).

## 2. baseApi.ts usage
Never use raw `axios` or `fetch` in slices. Always import `baseApi`.

```typescript
import { baseApi } from '@shared/api/baseApi';

export const tournamentApi = {
  getById: async (id: number): Promise<TournamentDto> => {
    const { data } = await baseApi.get<TournamentDto>(`/tournaments/${id}`);
    return data;
  }
};
```

## 3. JWT & tokenStorage
Authentication is handled centrally.
- Use `tokenStorage` from `@shared/lib/storage` if you need to manually clear tokens.
- Never pass tokens as function arguments in slices; the `baseApi` interceptor handles it.

## 4. DTO Naming & Typing
- All backend-mappable types must have a `Dto` suffix.
- Use `PascalCase` for type names.
- Define `Dto` types in `entities/*/model/types.ts`.

```typescript
// ✅ Correct
export interface UserProfileDto { ... }

// ❌ Incorrect
export interface UserData { ... }
```

## 5. Segment Rules
- `api/` hooks/functions should NOT contain UI state (`isLoading`, `error`). These live in the `ui/` component or `model/` store using React Query or local state.
