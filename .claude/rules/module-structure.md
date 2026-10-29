---
paths:
  - "src/domains/**"
  - "src/core/**"
  - "src/shared/**"
  - "src/app/**"
---

# Module structure

- Layers are `app → domains → core → shared`. A layer imports only from layers to its right. See the boundaries rule for the import limits.
- **Domain code** lives in `src/domains/<domain>/` (for example `admin`, `supplier`). Match the layout of the domain you are editing:

```text
src/domains/<domain>/
  <domain>.routes.ts   # RouteRecordRaw[] (see routing rule)
  layouts/             # domain shell
  pages/               # page components
  components/          # domain-only UI
  stores/              # Pinia stores for domain client state
  api/index.ts         # API calls: `api` from core, typed returns
  types/               # request / response types
```

- Scaffold a new domain with `pnpm create:domain`, then register its routes in `src/app/router/index.ts`.
- **`core/`** holds app-wide infrastructure: `auth/` (login, guards, stores, permissions), `lib/` (API client, endpoints, query client and keys, test IDs), and `config/` (env).
- **`shared/`** holds building blocks every layer may use: `ui/` (components, form fields, data table), `composables/`, `utils/`, `lib/yup/`, `locales/`, `styles/`, `types/`, and `constants/`.
- **`app/`** holds layouts, error pages, the router, plugins, and `main.ts`.
- If two domains need the same code, move it down to `core/` or `shared/`. A domain never imports another domain.
