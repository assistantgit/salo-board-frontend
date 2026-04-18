# SOLID + FSD Mapping Patterns

Specific patterns for applying SOLID principles within our React + FSD architecture.

## 1. SRP — Concern Segregation
Don't mix rendering and data logic.
- **BAD**: `UserCard.tsx` contains `useEffect` and `authApi.login`.
- **GOOD**: `ui/UserCard.tsx` (renders only) + `api/authApi.ts` (fetches only) + `model/store.ts` (manages state only).

## 2. OCP — The Slot Pattern
Components should be open for extension but closed for modification. Use "Slots" for action buttons or extra badges.

```tsx
interface CardProps {
  title: string;
  footer?: ReactNode; // Slot for extension
}

const Card = ({ title, footer }: CardProps) => (
  <div className="card">
    <h3>{title}</h3>
    {footer && <div className="card-footer">{footer}</div>}
  </div>
);
```

## 3. LSP — Contract Stability
Variants of a UI primitive MUST satisfy the base interface.
- `IconButton` must support all props of `Button`.
- `TournamentRepository` (Mock) must satisfy the same interface as `TournamentRepository` (Http).

## 4. ISP — Focused Interfaces
Interfaces and states should be narrow.
- **Stores**: Prefer `useUserStore`, `useCartStore` over a single `useAppStore`.
- **Props**: Don't pass the entire `UserDto` if you only need `user.name`.

## 5. DIP — Abstracting Externals
Depend on abstractions, not concretions.
- Any feature needing the API client should import the interface/singleton from `@shared/api`, not create its own `axios` instance.
- This allows swapping the API layer for testing or refactoring without touching features.
