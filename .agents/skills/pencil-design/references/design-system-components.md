# Design System Components (FSD Shared UI)

## Why This Matters

Pencil design files often contain a design system with reusable components (buttons, cards, inputs, navbars, etc.) marked with `reusable: true`. In our FSD architecture, these MUST map to `src/shared/ui`.

Reusing existing components ensures:
- **Architectural Integrity**: Designs align with the `shared` layer code.
- **Consistent Styling**: CSS variables from the design system are correctly applied.
- **D.R.I. (Design Reusable Interface)**: Code generation produces imports from `@shared/ui` instead of new implementations.

## Step-by-Step: Discovering and Using Components

### Step 1: List All Reusable Components
Always list components at the start of any design task:

```typescript
pencil_batch_get({
  filePath: "path/to/file.pen",
  patterns: [{ reusable: true }],
  readDepth: 2,
  searchDepth: 3
})
```

### Step 2: Map to @shared/ui
Identify which project component matches the Pencil node:

| Pencil Component | Code Implementation | Layer |
|------------------|---------------------|-------|
| `DefaultButton` | `src/shared/ui/buttons/DefaultButton.tsx` | `@shared/ui` |
| `Icon` | `src/shared/ui/icons/Icon.tsx` | `@shared/ui` |
| `LoginInputField` | `src/shared/ui/inputs/LoginInputField.tsx` | `@shared/ui` |
| `AuthFooter` | `src/shared/ui/auth-footer/AuthFooter.tsx` | `@shared/ui` |

### Step 3: Insert as a Ref Instance
Use the component's ID as the `ref` value:

```javascript
// Insert a button instance
btn=I("parentFrameId", { type: "ref", ref: "DefaultButton", width: "fill_container" })
```

### Step 4: Customize via "Slots" (SOLID)
If a component has placeholders, use `Replace (R)` or `Update (U)` on descendants to customize them without breaking the base component structure (Open/Closed Principle).

```javascript
// Change button label
U(btn+"/label", { content: "Log In" })
```

## Creating New Components

If you need a new atomic component, it belongs in `src/shared/ui`.
If you need a domain-specific component (e.g., `TournamentCard`), it belongs in `src/entities/tournament/ui`.

**Rule**: Any component used in 2+ layers or 2+ slices MUST be moved to `src/shared/ui`.

## Design System Discovery Checklist

- [ ] Have I searched specifically for components that map to `@shared/ui`?
- [ ] Am I using `ref` nodes to represent imports in the final code?
- [ ] Have I checked if the component is an "Entity" or a "Shared" UI element?

## See Also
- [design-to-code-workflow.md](design-to-code-workflow.md) — How components translate to FSD segments.
- [fsd-solid-integration.md](fsd-solid-integration.md) — Advanced SOLID mapping for Pencil.
