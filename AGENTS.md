# Project instructions

<!-- Shared by Codex, Gemini CLI, Cursor, and Claude Code (CLAUDE.md imports this file). Keep it tool-neutral and under 200 lines. -->

## Stack

Vue 3.5 SPA (Vite, `vue-tsc`), TypeScript, Tailwind CSS v4 with reka-ui primitives, Pinia, TanStack Vue Query and Vue Table, vee-validate + Yup, Axios, vue-i18n (`en`, `ar`), vue-sonner, Vitest + MSW. Aliases: `@` → `src`, `@app`, `@core`, `@shared`, `@domains`. Package manager: pnpm.

## Commands

- Dev: `pnpm dev` · Typecheck: `pnpm type-check` · Lint: `pnpm lint` (`pnpm lint:fix`) · Format: `pnpm format`
- Unit: `pnpm test:unit --run <file>` · Locale types: `pnpm locales:types` (runs inside `type-check`)
- New domain: `pnpm create:domain <name>` (kebab-case), then register its routes in `src/app/router/index.ts`
- Everything at once: `pnpm verify`. Run it only when asked.
- Verify a change with lint on the changed files, typecheck, and the relevant spec only. Never run the full suite unless asked. `pnpm test:unit` alone starts watch mode and hangs, so always pass `--run`.

## Architecture

- **Domain-driven SPA.** Imports flow one way only: `app → domains → core → shared`. A domain never imports another domain. `shared/` imports nothing above it. ESLint enforces domain isolation per domain folder.
- `src/domains/<domain>/` (today `admin`, `supplier`): routes, layout, pages, components, stores, `api/index.ts`, `types/`. `src/core/` is app-wide infrastructure (auth, API client, query keys, env). `src/shared/` is reusable building blocks (`ui/`, `composables/`, `utils/`, `lib/yup/`, `locales/`, `styles/`). `src/app/` holds layouts, error pages, router, `main.ts`.
- If two domains need the same code, move it down to `core/` or `shared/`; if a change seems to need a forbidden import, stop and propose that move.
- Known leaks in existing code (do not copy them): `shared/` files importing `@/core/...`, and `core`/`domains` importing `@/app/router`. Importing `app/router` guards and paths from routes files is the one tolerated exception.

## Golden rule: reuse before you write

Before creating any component, composable, or util, search for an existing one (`src/shared/ui`, `src/shared/composables`, `src/shared/utils`, `src/shared/lib`, `src/core/lib`). If one exists, use it. If you believe a new primitive is truly needed, say so and ask first.

## Where things live (don't search for these, use them)

- Query keys: `src/core/lib/query-keys.ts` · Endpoints: `src/core/lib/api/endpoints.ts` (`apiRoute()`) · API client: `src/core/lib/api/client.ts` · Table fetch: `src/core/lib/api/table.ts`
- Test IDs: `src/core/lib/test-ids.ts` · Env: `src/core/config/env.ts` · Query client: `src/core/lib/query-client.ts`
- Auth (login, guards, stores, permissions): `src/core/auth/` · Router, paths, guards: `src/app/router/`
- Validation: `src/shared/lib/yup/` · Errors: `src/shared/utils/apiError.ts` · Toasts: `src/shared/utils/toast.ts`
- Formatters: `src/shared/utils/formatter.ts`, `formatText.ts`, `formatStatus.ts` · Class merge: `cn()` from `@/shared/utils`
- UI primitives, form fields, data table: `src/shared/ui/` · Composables: `src/shared/composables/` · Tokens: `src/shared/styles/`
- Translations: `src/shared/locales/{en,ar}/<namespace>.json` · i18n wiring: `src/shared/locales/`

## Non-negotiables (details in `.claude/rules/`)

- **RTL-first.** Logical Tailwind classes only (`ms-* me-* ps-* pe-* start-* end-* text-start text-end`). Never `ml- mr- pl- pr- left- right- text-left text-right`.
- **No hard-coded UI strings.** Every label goes in `en` and `ar` JSON, used through `t()`.
- **Registries, not literals.** Query keys from `QUERY_KEYS`, URLs from `apiRoute()`, test ids from `TEST_IDS` (`data-test-id`), colors from the token file, route names from `paths`.
- **Server state in Vue Query, client state in Pinia.** Never copy API data into a store. No manual `try/catch` toasts.
- **Strict TypeScript.** No `any`, `interface` over `type`, `import type`, `@/` alias instead of `../`. Files under 300 lines.

## Path-scoped rules

Detailed rules live in `.claude/rules/`. Claude Code and Cursor (through the stubs in `.cursor/rules/`) load them by path automatically. Every other tool: before you edit files matching a glob below, read that rule file.

- `.claude/rules/boundaries.md`: `src/app/**`, `src/domains/**`, `src/core/**`, `src/shared/**`
- `.claude/rules/data-fetching.md`: `**/api/**/*.ts`, `**/services/**/*.ts`, `**/composables/**/*.ts`, `**/*.vue`, `src/core/lib/query-keys.ts`
- `.claude/rules/forms-and-validation.md`: `**/schemas/**/*.ts`, `**/*.vue`, `src/shared/ui/form/**`
- `.claude/rules/graphify.md`: always relevant
- `.claude/rules/i18n.md`: `src/shared/locales/**`, `**/*.vue`
- `.claude/rules/module-structure.md`: `src/domains/**`, `src/core/**`, `src/shared/**`, `src/app/**`
- `.claude/rules/permissions.md`: `src/core/auth/**`, `src/app/router/guards/**`, `**/*.vue`
- `.claude/rules/project-conventions.md`: always relevant
- `.claude/rules/routing.md`: `src/app/router/**`, `src/domains/**/*.routes.ts`, `src/core/auth/auth.routes.ts`
- `.claude/rules/state-management.md`: `src/core/auth/stores/**`, `src/domains/**/stores/**`, `src/shared/composables/**`
- `.claude/rules/styling.md`: `src/shared/styles/**`, `**/*.vue`
- `.claude/rules/testing.md`: `**/*.spec.ts`, `**/tests/**`, `**/vitest.config.ts`
- `.claude/rules/typescript.md`: `**/*.ts`, `**/*.vue`
- `.claude/rules/vue-ui.md`: `**/*.vue`

## Automated checks

- Hooks in `.claude/hooks/` (wired for Claude Code in `.claude/settings.json`, Gemini CLI in `.gemini/settings.json`, Codex in `.codex/hooks.json`, Cursor in `.cursor/hooks.json`): after each edit they run Prettier, RTL / convention / en-ar locale-parity checks, and ESLint on the file. Before edits they block lockfiles, `.env`, `*.generated.ts`, and build output. Before shell commands they block `vitest` without `--run`, force push, `--no-verify`, and `git reset --hard`. Fix what they report before moving on.
- No hooks in your tool? After editing, run `.claude/hooks/post-edit.sh <file>...` yourself and fix what it prints.

## Skills and subagents

- Skills (`fe-review`, `verify`, `add-endpoint`, `add-translation`, `new-domain`) are in `.claude/skills/`. Cursor reads that folder directly; Gemini CLI and Codex read it through the `.agents/skills` symlink. Their `SKILL.md` files are plain instructions: read and follow them if your tool does not load skills.
- Reviewer and test-writer subagent definitions: `.claude/agents/` (Claude Code), `.gemini/agents/` (Gemini CLI). Cursor reads `.claude/agents/` (its read-only `fe-reviewer` override is in `.cursor/agents/`). Without subagents, apply the checklist in `.claude/agents/fe-reviewer.md` yourself.

## Working style

- For anything touching more than 3 files, propose a plan first and wait for approval.
- Be concise. Show diffs, not whole files. Don't re-explain code I can read.
- Don't add dependencies, edit `package.json` scripts, or change `packageManager`/`engines` without asking.
- Never commit, push, or discard changes unless asked.
- For architecture or "where does X live" questions, if `graphify-out/GRAPH_REPORT.md` exists, read it before grepping the codebase.
