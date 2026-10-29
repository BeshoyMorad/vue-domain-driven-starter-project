---
paths:
  - "src/core/auth/stores/**"
  - "src/domains/**/stores/**"
  - "src/shared/composables/**"
---

# State management

- **Pinia** holds client, session, and UI state only:
  - Auth in `src/core/auth/stores/auth.ts`: access and refresh tokens and the user, persisted with `useLocalStorage` from `@vueuse/core`.
  - Permissions in `src/core/auth/stores/permissions.ts`.
  - Domain UI state in `src/domains/<domain>/stores/`, for example `useAdminStore`.
- **Vue Query** owns all API-backed state: lists, details, mutations, and infinite queries. Caching, refetch, and staleness belong there.
- Do not copy API entity data into Pinia. Read it through a query in a composable.
- Keep storage keys as constants, as `auth.ts` does.
- Logout goes through `authStore.clearAuth()`, which clears the query cache. Keep that path intact.
- Local component state uses `ref` and `computed`. Share state across components with a store or `provide`/`inject`.
- A domain store stays inside its domain. If another domain needs it, move it down to `core/`.
- Known gap: `isAuthenticated` in `auth.ts` is a placeholder. Do not rely on it as a real check until it is wired to `accessToken`.
