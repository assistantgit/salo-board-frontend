# CSS Architecture & Styling

This reference guides the implementation of premium, modular styling in Salo Board.

## 1. Local Color Tokens
Avoid global color variables. Colors belong to the component.

```css
/* LoginCard.module.css */
.card {
  /* ── Color tokens ── */
  --card-bg: #ffffff;
  --card-accent: #6560E0;
  
  background: var(--card-bg);
  border: 1px solid var(--card-accent);
}
```

## 2. Dark Mode Scoping
The dark theme is handled via `html[data-theme='dark']` in the same module.

```css
html[data-theme='dark'] .card {
  --card-bg: #1C1C38;
  --card-accent: rgba(101, 96, 224, 0.4);
}
```

## 3. Fluid Design (clamp)
NEVER use fixed pixels for fluid elements. Use `clamp()` for values that should scale between mobile and desktop.

```css
.card {
  padding: clamp(1rem, 2.5vw, 2rem);
  font-size: clamp(1.2rem, 1.5vw, 1.8rem);
}
```

## 4. Interaction States
Interactive elements must feel "alive".
- **Hover**: Subtle scale up and glow.
- **Active**: Subtle scale down (press effect).

```css
.button {
  transition: transform 0.2s, background 0.2s;
}

.button:hover {
  transform: scale(1.02);
}

.button:active {
  transform: scale(0.98);
}
```
