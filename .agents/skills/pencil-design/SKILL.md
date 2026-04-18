---
name: pencil-design
description: Design UIs in Pencil (.pen files) and generate production code from them. Use when working with .pen files, designing screens or components in Pencil, or generating code from Pencil designs. Triggers on tasks involving Pencil, .pen files, design-to-code workflows, or UI design with the Pencil MCP tools.
metadata:
  author: Nyasha Chiroro
  version: "1.0"
---

# Pencil Design Skill

Design production-quality UIs in Pencil and generate clean, maintainable code from them. This skill enforces best practices for design system reuse, variable usage, layout correctness, visual verification, and design-to-code workflows.

## When to Use This Skill

- Designing screens, pages, or components in a `.pen` file
- Generating code (React, Next.js, Vue, Svelte, HTML/CSS) from Pencil designs
- Building or extending a design system in Pencil
- Syncing design tokens between Pencil and code (Tailwind v4 `@theme`, shadcn/ui tokens)
- Importing existing code into Pencil designs
- Working with any Pencil MCP tools (`pencil_batch_design`, `pencil_batch_get`, etc.)

## Critical Rules

These rules address the most common agent mistakes. Violating them produces designs that are inconsistent, hard to maintain, and generate poor code.

### Rule 1: Always Reuse Design System Components

**NEVER recreate a component from scratch when one already exists in the design file.**

Before inserting any element, you MUST:
1. Call `pencil_batch_get` with `patterns: [{ reusable: true }]` to list all available reusable components
2. Search the results for a component that matches what you need (button, card, input, nav, etc.)
3. If a match exists, insert it as a `ref` instance using `I(parent, { type: "ref", ref: "<componentId>" })`
4. Customize the instance by updating its descendants with `U(instanceId + "/childId", { ... })`
5. Only create a new component from scratch if no suitable reusable component exists

See [references/design-system-components.md](references/design-system-components.md) for detailed workflow.

### Rule 2: Always Use Variables Instead of Hardcoded Values

**NEVER hardcode colors, border radius, spacing, or typography values when variables exist.**

Before applying any style value, you MUST:
1. Call `pencil_get_variables` to read all defined design tokens
2. Map your intended values to existing variables (e.g., use `primary` not `#3b82f6`, use `radius-md` not `6`)
3. Apply values using variable references, not raw values
4. When generating code, use CSS variables (e.g., `var(--primary)`, `var(--radius-md)`). NEVER use hardcoded hex codes or pixel values in your CSS files.

See [references/variables-and-tokens.md](references/variables-and-tokens.md) for detailed workflow.

### Rule 3: Prevent Text and Content Overflow

**NEVER allow text or child elements to overflow their parent or the artboard.**

For every text element and container:
1. Set appropriate text wrapping and truncation
2. Constrain widths to parent bounds
3. Use `"fill_container"` for width on text elements inside auto-layout frames
4. After inserting content, call `pencil_snapshot_layout` with `problemsOnly: true` to detect clipping/overflow
5. Fix any reported issues before proceeding

See [references/layout-and-text-overflow.md](references/layout-and-text-overflow.md) for detailed workflow.

### Rule 4: Visually Verify Every Section

**NEVER skip visual verification after building a section or screen.**

After completing each logical section (header, hero, sidebar, form, card grid, etc.):
1. Call `pencil_get_screenshot` on the section or full screen node
2. Analyze the screenshot for: alignment issues, spacing inconsistencies, text overflow, visual glitches, missing content
3. Call `pencil_snapshot_layout` with `problemsOnly: true` to catch clipping and overlap
4. Fix any issues found before moving to the next section
5. Take a final full-screen screenshot when the entire design is complete

See [references/visual-verification.md](references/visual-verification.md) for detailed workflow.

### Rule 5: Reuse Existing Assets (Logos, Icons, Images)

**NEVER generate a new logo or duplicate asset when one already exists in the document.**

Before generating any image or logo:
1. Call `pencil_batch_get` and search for existing image/logo nodes by name pattern (e.g., `patterns: [{ name: "logo|brand|icon" }]`)
2. If a matching asset exists elsewhere in the document (another artboard/screen), copy it using the `C()` (Copy) operation
3. Only use the `G()` (Generate) operation for genuinely new images that don't exist anywhere in the document
4. For logos specifically: always copy from an existing instance, never regenerate

See [references/asset-reuse.md](references/asset-reuse.md) for detailed workflow.

### Rule 6: Enforce FSD Architecture

**NEVER ignore the Feature-Sliced Design (FSD) layer boundaries.**

When designing and generating code:
1. Map Pencil Artboards to FSD layers: `shared`, `entities`, `features`, `widgets`, `pages`.
2. Ensure components are placed in the correct layer (e.g., a simple button goes to `shared/ui`, a login form goes to `widgets/login-form`).
3. Follow the "Golden Import Rule": Upper layers import lower layers, never reverse.
4. Always generate an `index.ts` (Public API) for every new slice or segment.

See [references/fsd-solid-integration.md](references/fsd-solid-integration.md) for detailed workflow.

### Rule 7: Apply SOLID Principles

**NEVER create "God-components" or tightly coupled modules.**

1. **S (Single Responsibility)**: One Pencil frame = one component/segment. Separate UI from logic.
2. **O (Open/Closed)**: Design components with "slots" (placeholders) to allow extension via props without modifying the base.
3. **I (Interface Segregation)**: Components should only accept props they actually use.
4. **D (Dependency Inversion)**: Use `ref` nodes in Pencil to represent abstract dependencies that can be swapped (Strategy Pattern).

See [references/fsd-solid-integration.md](references/fsd-solid-integration.md) for detailed workflow.

## Design Workflow

### Starting a New Design

```
0. Load `frontend-design` skill   -> Get aesthetic direction
1. pencil_get_editor_state        -> Understand file state, get schema
2. Identify FSD Layer             -> Decide where the component/page lives
3. pencil_batch_get (reusable)    -> Discover design system components
4. pencil_get_variables           -> Read design tokens
5. pencil_batch_design            -> Build the design (section by section)
6. pencil_get_screenshot          -> Verify each section visually
7. pencil_snapshot_layout        -> Check for layout problems
```

### Building Section by Section

For each section:
1. **Plan** - Identify FSD segments needed (`ui`, `model`, `api`).
2. **Build** - Insert components as `ref` instances, apply variables.
3. **Verify** - Screenshot + layout check.
4. **Fix** - Address issues.

### Design-to-Code Workflow

See [references/design-to-code-workflow.md](references/design-to-code-workflow.md) for the complete workflow.

Summary:
1. Call `pencil_get_variables` to map tokens to CSS `@theme` or variables.
2. Read the design tree with `pencil_batch_get`.
3. Separate into FSD segments: `ui` (components), `model` (state/validation), `api` (fetch logic).
4. Generate `index.ts` to export only the public interface.
5. Use Vanilla CSS with proper naming (e.g., `Component.module.css` or `Component.css`).

## MCP Tool Quick Reference

| Tool | When to Use |
|------|-------------|
| `pencil_get_editor_state` | First call - understand file state and get .pen schema |
| `pencil_batch_get` | Read nodes, search for components (`reusable: true`), inspect structure |
| `pencil_batch_design` | Insert, copy, update, replace, move, delete elements; generate images |
| `pencil_get_variables` | Read design tokens (colors, radius, spacing, fonts) |
| `pencil_set_variables` | Create or update design tokens |
| `pencil_get_screenshot` | Visual verification of any node |
| `pencil_snapshot_layout` | Detect clipping, overflow, overlapping elements |
| `pencil_get_guidelines` | Get design rules for: `code`, `table`, `tailwind`, `landing-page`, `design-system` |
| `pencil_find_empty_space_on_canvas` | Find space for new screens/frames |
| `pencil_get_style_guide_tags` | Browse available style directions |
| `pencil_get_style_guide` | Get specific style inspiration |
| `pencil_search_all_unique_properties` | Audit property values across the document |
| `pencil_replace_all_matching_properties` | Bulk update properties (e.g., swap colors) |
| `pencil_open_document` | Open a .pen file or create a new document |

## Common Mistakes to Avoid

| Mistake | Correct Approach |
|---------|-----------------|
| Creating a button from scratch | Search for existing button component, insert as `ref` |
| Using `fill: "#3b82f6"` | Use the variable: reference `primary` or the corresponding variable |
| Using `cornerRadius: 8` | Use the variable: reference `radius-md` or the corresponding variable |
| Generating `bg-[#3b82f6]` in code | Use semantic Tailwind class: `bg-primary` |
| Generating `text-[var(--primary)]` in code | Use semantic Tailwind class: `text-primary` |
| Generating `rounded-[6px]` in code | Use semantic Tailwind class: `rounded-md` |
| Using `var(--primary)` in className | Use semantic Tailwind class: `bg-primary` or `text-primary` |
| Not checking for overflow | Call `pencil_snapshot_layout(problemsOnly: true)` after every section |
| Skipping screenshots | Call `pencil_get_screenshot` after every section |
| Generating a new logo | Copy existing logo from another artboard with `C()` |
| Building entire screen, then checking | Build and verify section by section |
| Ignoring `pencil_get_guidelines` | Always call it for the relevant topic before starting |
| Using `tailwind.config.ts` | Use CSS `@theme` block (Tailwind v4) |
| Using Material Icons in code | Map to Lucide icons (`<Search />`, `<ArrowRight />`, etc.) |
| Skipping `frontend-design` skill | Always load it before designing in Pencil or generating code |
| Generic AI aesthetics (Inter font, purple gradients) | Follow `frontend-design` guidelines for distinctive, intentional design |

## Resources

- [Pencil Docs](https://docs.pencil.dev)
- [Pencil Prompt Gallery](https://www.pencil.dev/prompts)
- [Design as Code](https://docs.pencil.dev/core-concepts/design-as-code)
- [Variables](https://docs.pencil.dev/core-concepts/variables)
- [Components](https://docs.pencil.dev/core-concepts/components)
- [Design to Code](https://docs.pencil.dev/design-and-code/design-to-code)
- [Styles and UI Kits](https://docs.pencil.dev/design-and-code/styles-and-ui-kits)
