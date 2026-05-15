# FSD + SOLID Integration for Pencil

This guide explains how to map vector design operations in Pencil to Feature-Sliced Design (FSD) and SOLID architectural patterns.

## 1. FSD Layer Mapping

In Pencil, organize your document structure to mirror FSD layers. This ensures that when you generate code, it lands in the correct directory.

| Pencil Organization | FSD Layer | Code Target |
|---------------------|-----------|-------------|
| "Shared UI" Page/Frame | `shared` | `src/shared/ui` |
| "Entity: <Name>" Artboard | `entities` | `src/entities/<name>` |
| "Action: <Name>" Group | `features` | `src/features/<name>` |
| "Widget: <Name>" Frame | `widgets` | `src/widgets/<name>` |
| "Screen: <Name>" Page | `pages` | `src/pages/<name>` |

### Import Boundary Rule
In Pencil: Never link a `shared` component to a `pages` implementation directly without going through the hierarchy.
In Code: `pages` → `widgets` → `features` → `entities` → `shared`.

---

## 2. SOLID Principles in Design

### S — Single Responsibility
Each Pencil Artboard or Frame should represent exactly **one** concern.
- **BAD**: A single artboard containing a Header, Sidebar, and Body with all their internal logic.
- **GOOD**: Separate frames for `HeaderWidget`, `SidebarWidget`, and `MainContent`.

### O — Open/Closed Principle
Design components with **Slots**. Use a specific `frame` named "Slot" or "Placeholder" within your reusable components.
- **Pencil Operation**: Use `Replace (R)` to swap the content of the "Slot" in an instance.
- **Code Translation**: This maps to a `children: ReactNode` or `actions?: ReactNode` prop.

### L — Liskov Substitution
Ensure all variants of a component (e.g., `DefaultButton`, `IconButton`) share the same base structure and variables.
- **Pencil Operation**: Copy the base component `C(baseId, ...)` when creating a variant.

### I — Interface Segregation
Don't create "God-components" with dozens of visibility toggles.
- **GOOD**: Create focused components. For an Avatar, don't bundle "AvatarWithMenu", "AvatarWithStatus", and "AvatarStandalone". Create a base `Avatar` and compose it in higher layers.

### D — Dependency Inversion
Use `ref` nodes to represent "interfaces".
- **Design Pattern**: If a `Card` needs a button, don't hardcode a specific button structure inside. Insert a `ref` node.
- **Code Translation**: The `Card` component will accept a `renderButton` prop or a `button` slot.

---

## 3. Practical Examples

### Creating a Widget (FSD)
A widget like `LoginForm` is a composition.

1.  **Read Components**: `pencil_batch_get` from `Shared UI`.
2.  **Insert Refs**: `btn = I(loginForm, { type: "ref", ref: "DefaultButton" })`.
3.  **Encapsulate**: All internal children of the `LoginForm` frame are private to the widget's `ui/` segment.
4.  **Export**: Generate `src/widgets/login-form/index.ts`.

### Open/Closed Strategy (SOLID)
If you have a `PageLayout` with a header:

```javascript
layout = I(document, { type: "frame", name: "PageLayout" })
headerSlot = I(layout, { type: "frame", name: "header-slot", placeholder: true })

// To use it:
myHeader = I("SharedUI/Header")
R(layout + "/header-slot", myHeader) // Replace slot with actual header
```

---

## Checklist for Code Generation

- [ ] Does this artboard match an FSD layer?
- [ ] Is the `index.ts` public API defined?
- [ ] Are business logic (API/Model) separated from UI?
- [ ] Are all styles using project variables?
