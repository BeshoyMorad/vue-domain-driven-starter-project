# Project conventions

- TypeScript everywhere. Vue SFCs use `<script setup lang="ts">` only (no Options API).
- Import across folders with the `@/` alias (`@/app`, `@/core`, `@/domains`, `@/shared`). `./` is fine inside one domain folder. Parent-relative imports (`../*`) are lint-restricted, so use the alias.
- Prefer named exports. Use `index.ts` barrels for a folder's public API (`@/shared/ui`, `@/shared/composables`, `@/shared/lib/yup`).
- Merge classes with `cn()` from `@/shared/utils`.
- Formatting follows `.prettierrc`: single quotes, semicolons, 2-space indent, `printWidth` 100, `trailingComma: es5`. Tailwind class order is handled by `prettier-plugin-tailwindcss`.
- Tests are Vitest, with `*.spec.ts` next to the code under test. Run one file with `pnpm test:unit --run <file>`.
- Lint with `pnpm lint`, typecheck with `pnpm type-check`.
