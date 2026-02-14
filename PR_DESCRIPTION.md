# feat: Migrate from Next.js to Vite + TanStack Router (TanStack Start)

## Summary

This PR migrates the PesaQR web app from **Next.js** to **Vite** with **TanStack Start** (TanStack Router + Nitro for SSR). It also modernizes state management, tooling, and styling.

## What changed

### Framework & build

- **Next.js** → **Vite 7** with **TanStack Start** (`@tanstack/react-start`)
- **Pages Router** → **TanStack Router** file-based routing (`src/routes/`)
- SSR and deployment handled by **Nitro** (via TanStack Start)
- Removed: `next.config.mjs`, `pages/` (e.g. `_app.tsx`, `_document.tsx`, `index.tsx`), `postcss.config.js`, `tailwind.config.ts` (Tailwind now via Vite plugin)
- Added: `vite.config.ts`, `src/router.tsx`, `src/routeTree.gen.ts`, `src/routes/__root.tsx`, `src/routes/index.tsx`

### State management

- **React Context (`AppContext`)** → **Zustand** with `persist` middleware
- New store: `src/store/useAppStore.ts` — same form/QR data shape, persisted to `localStorage` under `PESAQR_DB`
- Components now use `useAppStore()` (e.g. `HomeUI`, `PaymentDetails`, `ColorPicker`, `NumPad`) instead of context

### Styling

- **`src/styles/globals.css`** → **`src/styles.css`**
- Tailwind v3 + PostCSS → **Tailwind v4** via `@tailwindcss/vite`
- Added `tw-animate-css`, kept existing design tokens (e.g. OKLCH variables, Inter/Baloo Paaji 2)
- Root layout and global styles wired in `__root.tsx` via `head.links` and `shellComponent`

### Tooling & config

- **ESLint**: `.eslintrc.json` → **flat config** `eslint.config.js` using `@tanstack/eslint-config`
- **Prettier**: added `prettier.config.js` and `.prettierignore`
- **Package manager**: **npm** → **pnpm** (`pnpm-lock.yaml`, `packageManager` in `package.json`)
- **TypeScript**: `tsconfig.json` updated for Vite (e.g. `moduleResolution: "bundler"`, `verbatimModuleSyntax`, `types: ["vite/client"]`)

### Dependencies

- Added: `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/router-plugin`, `@tanstack/react-router-devtools`, `@tanstack/react-form`, `vite`, `@vitejs/plugin-react`, `vite-tsconfig-paths`, `zustand`, `nitro`, and expanded UI/lib set (see `package.json`)
- Removed: Next.js and related Next-specific deps
- React 19 and existing app dependencies (e.g. Radix, react-hot-toast, QR libs) retained

### UI & components

- **New**: `src/components/Header.tsx` and many shared UI primitives under `src/components/ui/` (e.g. accordion, alert, avatar, badge, calendar, form, sheet, sidebar, table, tooltip, etc.) for future use
- **Updated**: Existing feature components (`HomeUI`, `ColorPicker`, `InstallButton`, `NumPad`, `PaymentDetails`, and shared `ui` components like `button`, `card`, `dialog`, `input`, `select`, etc.) to work with Vite, TanStack Router’s `Link`, and the new Zustand store
- **Root document**: HTML shell, meta tags, and Toaster live in `__root.tsx`; app content rendered via TanStack Router

### Types & utils

- `src/@types/Data.ts`, `Settings.ts`, `TransactionType.ts` and `src/utils/helpers.ts` updated as needed for the new setup
- `src/lib/utils.ts` and path alias `@/*` unchanged in use

## Scripts

| Before (Next) | After (Vite)   |
|---------------|----------------|
| `next dev`    | `pnpm dev` (Vite dev on port 3000) |
| `next build`  | `pnpm build`   |
| —             | `pnpm preview` |
| —             | `pnpm test` (Vitest) |
| —             | `pnpm lint` / `pnpm format` / `pnpm check` |

## How to test

1. **Install**: `pnpm install`
2. **Dev**: `pnpm dev` → open http://localhost:3000
3. **Build**: `pnpm build` then `pnpm preview`
4. **Smoke-check**: Generate QR (till number / paybill), change color/banner, download/share, install prompt (if available); confirm state persists after refresh (Zustand persist)

## Breaking changes / notes

- **No Next.js**: Any Next-specific APIs or conventions are removed; use TanStack Router and Vite equivalents.
- **New routing**: Single route so far (`/` → `HomeUI`). Add files under `src/routes/` for new routes; `routeTree.gen.ts` is generated.
- **State**: If anything relied on `AppContext` outside the app tree, it must use `useAppStore()` or the store’s public API.
- **Env/config**: Next env vars (e.g. `NEXT_PUBLIC_*`) are not used; use Vite’s `import.meta.env` if needed.

## Checklist

- [x] App runs with `pnpm dev` and `pnpm build` / `pnpm preview`
- [x] QR generation, color picker, payment details, and install/share behavior preserved
- [x] Form state persists across reloads (Zustand persist)
- [x] Meta tags and PWA assets (favicon, manifest, og image) still applied from root
- [x] ESLint and Prettier run without errors
