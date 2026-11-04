---
name: add-endpoint
description: Add a new API call end to end (endpoint route, query key, service, composable, typed response). Use when a feature needs a new backend call, list, detail, or mutation.
---

# Add an API call

Follow the existing pattern of a nearby module. Do not create a second HTTP client, inline query keys, or hardcoded URLs.

1. **Route.** Add a named route to the `routes` object in `src/core/lib/api/endpoints.ts`. Call it only through `apiRoute('name')`.
2. **Query key.** Add a factory to `QUERY_KEYS` in `src/core/lib/query-keys.ts` (`all`, `list`, `details(id)` as the existing groups do).
3. **Types.** Add request and response types in ``src/domains/<domain>/types/``. Use `interface`, not `type`.
4. **Service.** Add a small `async` function in ``src/domains/<domain>/api/index.ts``. It uses the `api` instance from `@/core/lib/api/client` and returns a typed payload. No toasts, no `try/catch`: the client handles errors.
5. **Composable.** Wrap it in ``src/domains/<domain>/` (a `composables/` folder is fine if the domain has none yet)` with `useQuery`, `useMutation`, or `useInfiniteQuery`.
   - Lists and tables: use `useDataTable` or `useDataInfiniteScroll` instead of writing pagination.
   - Mutations: invalidate with `queryClient.invalidateQueries({ queryKey: QUERY_KEYS.<group>.all() })` and show success with the toast helper. Map field errors with `applyApiErrorToForm`.
6. **Test.** Add a spec next to the composable or service using the MSW `server` from `tests/setup.ts`.
7. Layering check: a domain may import `core` and `shared` only. If another domain needs this call, move it down to `core/` instead of importing across domains.

Finish with the `verify` skill.
