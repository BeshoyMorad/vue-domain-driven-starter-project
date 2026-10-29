---
paths:
  - "**/api/**/*.ts"
  - "**/services/**/*.ts"
  - "**/composables/**/*.ts"
  - "**/*.vue"
  - "src/core/lib/query-keys.ts"
---

# Data fetching (TanStack Query)

- All HTTP goes through the shared `api` instance from `@/core/lib/api/client` (auth header, device-id, 401/403/500 handling). Do not create another Axios instance.
- Build URLs only with `apiRoute('name')` from `@/core/lib/api/endpoints`. Add new route names to the `routes` object in that file first. No hardcoded `/api/...` strings.
- API calls are small `async` functions that return typed payloads: `domains/<domain>/api/index.ts` for a domain, `core/auth/services/` for auth. `queryFn` and mapping belong there or in composables, not in components.
- Server state uses TanStack Vue Query: `useQuery`, `useMutation`, `useInfiniteQuery`.
- Query keys come from the `QUERY_KEYS` registry in `@/core/lib/query-keys`, for example `QUERY_KEYS.starter.profile()`. Add new keys there before using them. Never inline arrays like `queryKey: ['users', id]`.
- After a mutation, invalidate through `useQueryClient()` using the registry, for example `invalidateQueries({ queryKey: QUERY_KEYS.users.all() })`. Do not mirror server data in Pinia.
- The query client in `src/core/lib/query-client.ts` hashes the active locale into every query. Do not add locale to individual keys.
- Lists and tables:
  - `useDataTable` for offset pagination.
  - `useDataInfiniteScroll` for infinite lists.
  - Both come from `@/shared/composables`, call `fetchTableData` from `@/core/lib/api/table`, and take an `endpoint` and a `queryKey`.
  - Do not write manual pagination or scroll logic.
- Errors are handled by the client interceptors and `@/shared/utils/apiError`. Do not add a `try/catch` that toasts manually. Map field errors onto forms with `applyApiErrorToForm` (see the forms rule). Use `@/shared/utils/toast` for success messages.
