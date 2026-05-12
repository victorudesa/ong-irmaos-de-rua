# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands

```bash
npm run dev        # Start dev server (HMR enabled, http://localhost:5173)
npm run build      # Build for production (tsc -b && vite build)
npm run lint       # Run ESLint on all files
npm run preview    # Preview production build locally
```

## Project Overview

**ong-irmaos-de-rua** is a marketing/institutional website for an NGO built with React 19, TypeScript, and Tailwind CSS. The app is a static SPA (no backend) with form submissions handled via side-effects (currently mock submissions with client-side success states).

### Stack

- **React 19** — Lazy routes with code-splitting
- **TypeScript 6** — Strict inference
- **Tailwind CSS 4** + **@tailwindcss/vite** — styling via CVA (Class Variance Authority)
- **shadcn/ui** — pre-built UI components
- **Zod** + **React Hook Form** — form validation with zodResolver
- **React Router v7** — createBrowserRouter, lazy route loading
- **Vite** — fast builds and HMR

Path alias: `@/` → `src/`

### Architecture

```
src/
  pages/          — Lazy-loaded page components (one per route)
  components/
    ui/           — Primitive UI components (Button, Input, Label, Textarea, etc.)
    layout/       — Layout wrappers (Section with CVA variants)
    shared/       — Reusable features (FeatureCard)
    forms/        — Form components (VoluntarioForm)
    icons/        — Custom icon components
  lib/
    schemas/      — Zod validation schemas + exported types
    utils.ts      — Utility functions (cn, etc.)
  App.tsx         — Router setup + ErrorBoundary
  main.tsx        — React.StrictMode entry point
```

### Key Patterns

**CVA Variants (Class Variance Authority)**
- All styled components extract `variants.ts` files (e.g., `button.variants.ts`, `heading.variants.ts`)
- Components import variants and use them: `button({ size, variant })`
- Never put raw Tailwind classes in component JSX; always use the variant file
- Example: [src/components/ui/button.variants.ts](src/components/ui/button.variants.ts)

**Button Design System**
All buttons use the variant system — never add inline styles to button elements.

Three components:
- `<Button>` — native HTML button (forms, actions)
- `<LinkButton>` — React Router Link (internal navigation)
- `<ExternalLinkButton>` — `<a href>` for external links (WhatsApp, Instagram, parceiros) — auto adds `target="_blank"`, `rel="noopener noreferrer"`, external-link icon

Quick reference:

| Context | Component | Variant | Size | Example |
|---------|-----------|---------|------|---------|
| Primary CTA (dark/light bg) | LinkButton | `default` | `lg` | Hero "Doe Agora" |
| Secondary CTA (light bg) | LinkButton | `outline` | `default` | "Ver ações" |
| Secondary CTA (dark bg) | LinkButton | `outline-light` | `lg` | Hero "Seja Voluntário" |
| Form submit | Button | `default` | `lg` | "Quero Ser Voluntário" |
| Icon button (copy, etc) | Button | `ghost` | `icon-sm` | Copy/Check |
| Primary on primary bg | LinkButton | `inverted` | `lg` | CtaBanner "Fazer doação" |
| External link (WhatsApp, redes) | ExternalLinkButton | `outline` | `default` | "Fale Conosco" |

**Never do this:**
```tsx
// ❌ WRONG — inline styles
<Link to="/doe" style={{ background: 'var(--color-primary)' }} className="px-8 py-3">
  Donate
</Link>
```

**Always do this:**
```tsx
// ✅ RIGHT — variant system
<LinkButton to="/doe" variant="default" size="lg">
  Donate
</LinkButton>
```

See [src/docs/design-system.md](src/docs/design-system.md) for complete reference, accessibility notes, and future-proofing

**Form Validation**
- Schemas live in `src/lib/schemas/` with Zod
- Export both schema and inferred type: `export type VoluntarioFormData = z.infer<typeof voluntarioSchema>`
- Include enum options (availabilityOptions, interestOptions) in the same file
- Use `zodResolver` in `useForm` and `Controller` for custom field logic
- Example: [src/lib/schemas/voluntario.ts](src/lib/schemas/voluntario.ts), [src/components/forms/VoluntarioForm.tsx](src/components/forms/VoluntarioForm.tsx)

**Routing & Code Splitting**
- All pages are lazy-loaded with `lazy(() => import('@/pages/...'))`
- Wrap lazy routes in `<Suspense>` in App.tsx (currently `fallback={null}`)
- Each route has an `errorElement: <RouteError />`
- Catch-all route `{ path: '*', element: <NotFound /> }` is last
- Example: [src/App.tsx](src/App.tsx)

**Layout Structure**
- All pages are wrapped in `<Layout>` which provides Navbar, Footer, WhatsAppButton
- Layout includes skip-to-main link (sr-only, focus-visible)
- Main content uses `id="main"` with `pt-16` offset for fixed navbar
- Example: [src/components/Layout.tsx](src/components/Layout.tsx)

**Design Tokens**
- CSS variables live in Tailwind config (colors, typography, spacing)
- Components use `style={{ color: 'var(--color-primary)' }}` or Tailwind classes
- No inline hex colors; always token-based

**Error Handling**
- [src/components/ErrorBoundary.tsx](src/components/ErrorBoundary.tsx) — catches render errors in tree
- [src/pages/RouteError.tsx](src/pages/RouteError.tsx) — per-route error fallback
- [src/pages/NotFound.tsx](src/pages/NotFound.tsx) — 404 for unmatched routes

### UI Components (shadcn-based, CVA variants)

All primitive UI components follow CVA pattern:
- `Button`, `LinkButton` — see Button Design System above
- `Input`, `Textarea`, `Label` — form primitives (unstyled, inherit from shadcn)
- `Heading`, `SectionLabel` — typography with variants
- `Accordion` — disclosure component from Radix UI

**Using custom variants (Heading, SectionLabel, etc):**
```tsx
import { Heading } from '@/components/ui/heading'

// Variants control size, color, weight
<Heading color="inverted" size="lg">
  Title
</Heading>
```

Never add raw Tailwind for typography — use the component variant instead.

### Conventions to Maintain

1. **Component exports** — default export for page components, named export for reusable components
2. **Props interface** — `interface ComponentProps { ... }` above component function
3. **Unused vars** — prefix with `_` (e.g., `_data`); ESLint is configured to ignore these
4. **No prop drilling abstractions** — React 19 props are fine for this scope; no Redux/Context unless necessary
5. **Tailwind for layout, CVA for components** — layout/spacing in classes, colors/sizes via variants
6. **Form reset** — always reset form state after successful submission (see VoluntarioForm success state)
7. **No inline button styles** — always use `<Button>` / `<LinkButton>` / `<ExternalLinkButton>` with variant prop, never style inline

### Anti-Patterns to Avoid

- **Don't add global state** (Redux, Context) without justification — prop drilling is fine for this app size
- **Don't duplicate Zod schemas** — one schema = one file, reuse everywhere
- **Don't put Tailwind classes in components** — always extract to `.variants.ts`
- **Don't lazy-load without Suspense** — every lazy route must be wrapped in Suspense in App.tsx
- **Don't break the Section wrapper** — use [src/components/layout/section.tsx](src/components/layout/section.tsx) for consistent layout
- **Don't inline SVG without wrapping** — create icon components in [src/components/icons/](src/components/icons/)
- **Don't style buttons inline** — ever. Always use `<Button>` / `<LinkButton>` / `<ExternalLinkButton>` with variant system
- **Don't add new button variants without reason** — check if existing ones fit first; add to button.variants.ts if truly needed

### When to Extend the Design System

**Add a new button variant if:**
- You need a state/behavior that existing variants don't cover (e.g., `loading`, `success`)
- Multiple components need the same button styling (not a one-off)

**How to add a variant:**
1. Update [src/components/ui/button.variants.ts](src/components/ui/button.variants.ts)
2. Document it in [src/docs/design-system.md](src/docs/design-system.md) with use case
3. Update this CLAUDE.md with the new row in the quick reference table

### Form Submission

Forms currently submit with a mock delay and update local state. In the future, this will integrate with a backend or third-party service (Slack, email, etc.). The pattern to follow:

```tsx
const onSubmit = async (data: FormDataType) => {
  // Send to backend/service
  await fetch('/api/submit', { method: 'POST', body: JSON.stringify(data) })
  setSuccess(true)
  reset()
}
```

### ESLint Configuration

- Extends: `@typescript-eslint/recommended`, `react-hooks/recommended`, `react-refresh/vite`
- Unused vars rule: errors if unused, unless prefixed with `_`
- React Refresh rule: warns if exporting non-components, allows const exports
- Run `npm run lint` to check; fix with `eslint . --fix`

### How to Add a New Button

1. **Determine context** — where will it appear? Dark or light background? Primary or secondary action?
2. **Pick variant + size** — use the table in Button Design System section
3. **Use the right component**:
   - Internal navigation → `<LinkButton to="..." />`
   - Form submit → `<Button type="submit" />`
   - External link → `<a href="..." />`
4. **Add icon if needed** — icon goes inside, no data attributes needed
5. **Never style inline** — all styling via `variant` and `size` props

Example (Hero CTA):
```tsx
import { LinkButton } from '@/components/ui/link-button'
import { HeartIcon } from '@/components/icons/HeartIcon'

<LinkButton to="/doe-agora" variant="default" size="lg">
  <HeartIcon width="16" height="16" stroke="currentColor" />
  Doe Agora
</LinkButton>
```

Example (Form submit):
```tsx
import { Button } from '@/components/ui/button'

<Button type="submit" variant="default" size="lg" disabled={isSubmitting}>
  {isSubmitting ? 'Enviando...' : 'Quero Ser Voluntário'}
</Button>
```

### Development Notes

- HMR is enabled; changes to pages/components hot-reload
- TypeScript errors block builds (`tsc -b` runs before Vite)
- No tests configured yet; add Jest/Vitest if needed
- No analytics or third-party services yet
