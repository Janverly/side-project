# SnapBox

Digital photobooth, built on the `NEW_PROJECT.md` boilerplate (Vite, React 19, TypeScript, React Router 7,
TanStack Query, React Hook Form + Zod, Zustand, nuqs, MSW, Vitest).

```bash
npm install
cp .env.example .env.local     # turns the fake backend (MSW) on
npm run dev                    # http://localhost:3000  (demo@example.com / password123)
npm run test:run && npm run typecheck && npm run build
```

## How the original maps onto the boilerplate

| Original | Now |
|---|---|
| `index.html` screens | Routes: `/booth`, `/booth/customize`, `/sessions` (+ `/sessions/:id` modal, `/sessions/:id/edit`) |
| `state` object | `features/booth/hooks/booth.store.ts` (Zustand, client state, not persisted) |
| `getSessions()` / `localStorage` | `lib/mock/sessions-store.ts` behind MSW handlers, same `snapbox-sessions` key |
| Session CRUD functions | `features/sessions` (schema, service, hooks, components, pages) |
| Search box | `?q=` URL state (nuqs) |
| Save dialog | `SaveSessionModal` (React Hook Form + Zod) |
| `exportPng`, `filterValue`, ... | `lib/strip/` (pure functions, tested) |
| `style.css` | `src/styles/snapbox.css` (same classes) |
