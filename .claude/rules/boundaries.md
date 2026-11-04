---
paths:
  - "src/app/**"
  - "src/domains/**"
  - "src/core/**"
  - "src/shared/**"
---

# Import boundaries

- Direction is `app → domains → core → shared`. A layer imports only from layers to its right.
- A file in `domains/x` never imports from `domains/y`, through `@/domains/y`, `@domains/y`, or a relative path. ESLint enforces this per domain folder.
- `shared/` imports nothing from `core/`, `domains/`, or `app/`, and code under `shared/` imports only from `@/shared/*`.
- `core/` imports only `core/` and `shared/`. Routes files may import router guards and paths from `@/app/router`; that is the one tolerated exception.
- Existing leaks (for example `shared/ui/Tabs.vue` importing the core permission store) are debt. Do not add new ones and do not copy them.
- If a change seems to need a forbidden import, stop and propose moving the shared piece down a layer instead.
