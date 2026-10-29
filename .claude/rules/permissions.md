---
paths:
  - "src/core/auth/**"
  - "src/app/router/guards/**"
  - "**/*.vue"
---

# Permissions

- Permissions are `resource.action` strings, for example `admin.list`.
- In components, use `useCan()` from `@/core/auth/composables/useCan` and call `can('resource.action')`. In stores, use `usePermissionStore().can` from `@/core/auth/stores/permissions`. Do not re-parse permission strings by hand.
- `can()` takes an optional operator for multiple permissions: `can(['a.list', 'b.list'], 'and')`. The default is `'or'`.
- Templates hide or disable controls with `v-if="can('...')"`. Keep the UI safe when `can` is false.
- Protect routes too, not only buttons. Add a guard in `src/app/router/guards/` and attach it through `beforeEnter`, the same way `authGuard` is wired. Domain access uses `meta.allowedDomains`.
- Known gap: the store's `permissions` is a fixed stub (`admin: ['list']`), and the link to the authenticated user's role is commented out in `src/core/auth/stores/permissions.ts`. Treat it as a placeholder until that is wired.
