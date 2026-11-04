---
name: new-domain
description: Scaffold a new business domain under src/domains/<domain>/ and wire its routes. Use when asked to add a new domain, portal, or user area.
---

# New domain

1. **Scaffold.** Run `pnpm create:domain <kebab-name>`. It creates `api/index.ts`, `types/`, `stores/`, `layouts/`, `pages/`, `components/`, and `<domain>.routes.ts`.
2. **Register.** Spread the routes into `routes` in `src/app/router/index.ts`. Add the domain's names to `src/app/router/paths.ts` (names must match the routes file). Set `meta.allowedDomains: ['<domain>']` on the layout route and its children, `authGuard` on app routes.
3. **Layering.** The domain imports `core/` and `shared/` only. If it needs something from another domain, move that code to `core/` or `shared/` instead.
4. **Data.** Use the `add-endpoint` skill: routes in `src/core/lib/api/endpoints.ts`, keys in `src/core/lib/query-keys.ts`, calls in `domains/<domain>/api/index.ts`.
5. **Text.** Use the `add-translation` skill (`src/shared/locales/{en,ar}`).
6. **Test ids.** Add keys to `src/core/lib/test-ids.ts` and bind `:data-test-id`.
7. **Tests and checks.** Add specs next to composables, stores, and API functions. Run the `verify` skill; ESLint domain-isolation errors mean a forbidden import.
