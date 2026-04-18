# Variables and Design Tokens

## Why This Matters

Pencil variables are the equivalent of design tokens. In our Vanilla CSS stack, these MUST map to CSS variables (e.g., `var(--primary)`).

Using variables ensures:
- **Theme Support**: Designs adapt to Light/Dark mode automatically.
- **Consistency**: Designs match the project's `app/styles` definition.
- **Maintainability**: Global updates (like changing a brand color) require updating only one variable.

## Step-by-Step: Reading and Using Variables

### Step 1: Read All Variables
Always list variables at the start of any design task to understand the project's palette:

```typescript
pencil_get_variables({ filePath: "path/to/file.pen" })
```

### Step 2: Map to Project CSS Tokens
Before applying any style, map the Pencil variable to its CSS equivalent:

| Pencil Variable | CSS Reference | Usage Example |
|----------------|---------------|---------------|
| `primary` | `var(--primary)` | `border-color: var(--primary);` |
| `background` | `var(--background)` | `background-color: var(--background);` |
| `foreground` | `var(--foreground)` | `color: var(--foreground);` |
| `radius-md` | `var(--radius-md)` | `border-radius: var(--radius-md);` |
| `spacing-md` | `var(--spacing-md)` | `gap: var(--spacing-md);` |

### Step 3: Apply Variables in Design
When designing, bind node properties (fill, stroke, cornerRadius) to these variables. Consult the `.pen` schema for the exact binding syntax.

## Theme Support (Light/Dark)
Variables in Pencil support themes. Ensure that `background` and `foreground` have different values for `light` and `dark` themes.

```json
{
  "background": {
    "themes": {
      "light": "#ffffff",
      "dark": "#0a0a0a"
    }
  }
}
```

## CSS Variable Usage in Code
When generating code from Pencil, output Vanilla CSS files using `var()` syntax.

### Component Styles Example

```css
/* ui/buttons/DefaultButton.css */
.default-button {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
}
```

## Checklist before Styling
- [ ] Have I called `pencil_get_variables`?
- [ ] Am I using `var(--name)` mapping instead of hex codes?
- [ ] Have I verified that the variable name exists in the project's CSS?

## See Also
- [design-to-code-workflow.md](design-to-code-workflow.md) — How variables are used in FSD segments.
- [fsd-solid-integration.md](fsd-solid-integration.md) — Advanced mapping for complex designs.
