# Review rules (used by Claude Code Review on PRs)

Only report issues in changed lines. Severity: blocker > major > nit. Skip style nits that lint or Prettier already catch. Stack: domain-driven Vue 3 SPA (app → domains → core → shared).

## Blockers
- Cross-domain import (`domains/a` → `domains/b`), by `@/domains/...` or `@domains/...`
- `shared/` importing from `core/`, `domains/`, or `app/`; `core/` importing from `domains/`; a domain importing `app/` other than router guards and paths
- Auth tokens, refresh tokens, or user data stored outside `src/core/auth/stores/auth.ts`
- Direct `localStorage`/`sessionStorage` use in a component instead of a store with `useLocalStorage`
- Domain route without `meta.allowedDomains` (leaks one domain's screens to another's users)

## Major
- New component/composable/util duplicating an existing primitive (`shared/ui`, `shared/composables`, `shared/utils`)
- Inline `queryKey` arrays, hardcoded API URLs, manual toasts in `try/catch`, a second HTTP client
- Server data copied into Pinia instead of read through Vue Query
- Manual pagination / scroll logic instead of `useDataTable` / `useDataInfiniteScroll` / `useVirtualScroll`
- Physical Tailwind direction classes (breaks Arabic RTL)
- Hard-coded UI string, or a key added to only one of `en` / `ar`, or an `ar` value left in English
- `any`, `as any`, or `@ts-ignore` without a comment explaining why
- New logic (composable, service, schema, util) with no spec
- Raw `<input>`, `<select>`, custom modal, or table instead of the shared primitives
- Raw hex color or arbitrary color value instead of a design token; new semantic token without `light-dark()`
- Route added without `meta.title`, a lazy import, or a permission/auth guard where the neighbouring routes have one
- Code needed by two domains copied into both instead of moved to `core/` or `shared/`
- New domain created by hand instead of `pnpm create:domain`, or its routes not registered in `src/app/router/index.ts`

## Nit
- Missing `data-test-id` (value from `TEST_IDS`) on interactive elements; `data-test=` is the wrong attribute
- Inline date/currency/status formatting instead of `formatter.ts` / `formatText.ts` / `formatStatus.ts`
- Parent-relative import (`../x`) instead of the alias
- Component over 300 lines or function over ~50 lines that should be split
- `console.log` left in

## Skip
- Pre-existing problems in lines the PR did not touch.
- Demo and showcase code under the `demo` locale namespace and any demo pages unless the PR changes how it is meant to be used.
- Generated files (`*.generated.ts`) and lockfiles.
