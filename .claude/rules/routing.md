---
paths:
  - "src/app/router/**"
  - "src/domains/**/*.routes.ts"
  - "src/core/auth/auth.routes.ts"
---

# Routing

- Route names are constants. Import `paths` from `@/app/router/paths` and use `{ name: paths.<area>.<route> }` in `router.push`, `RouterLink`, and guards. Never write raw path strings for navigation.
- Each domain exports `<domain>.routes.ts` (`RouteRecordRaw[]`) with a base path, a layout component, and `children`. Register it by spreading it into `routes` in `src/app/router/index.ts`, as `adminRoutes`, `supplierRoutes`, and `authRoutes` are.
- When you add a route, add its name to `paths` and keep the `name` in the routes file identical to it.
- Lazy-load every layout and page: `component: () => import('./pages/AdminDashboard.vue')`.
- Guards come from `@/app/router/guards`. App routes use `beforeEnter: [authGuard]`, and auth screens use `guestGuard`.
- Limit a domain to its users with `meta.allowedDomains: ['<domain>']` on the layout route and its children.
- Set `meta.title` on every route. Set `meta.sidebar: false` on screens without the app shell, such as the error pages.
- Error routes are `paths.errors.*`. The Axios client redirects to them on 403 and 500, so keep those names.
