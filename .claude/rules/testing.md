---
paths:
  - "**/*.spec.ts"
  - "**/tests/**"
  - "**/vitest.config.ts"
---

# Testing (Vitest)

- Unit tests are Vitest with jsdom and `globals: true`. Name them `*.spec.ts` and put them next to the code under test.
- `tests/setup.ts` exports the MSW `server`, `findByTestId`, and a mount helper.
- Find elements by test id: `findByTestId(wrapper, TEST_IDS.<group>.<key>)` (attribute `data-test-id`). Do not select by class or by translated text.
- Mock HTTP with MSW handlers on the shared `server` (`server.use(http.get(...))`). Handlers reset after each test. Do not stub the API client.
- Mount components with the helper in `tests/setup.ts`; it installs Pinia (`@pinia/testing`) and Vue Query. Give each test a fresh `QueryClient`.
- Run one file: `Run one file with `pnpm test:unit --run <file>`.`. Plain `vitest` starts watch mode, so always pass `--run`.
- Test behavior (inputs, outputs, emits, loading/empty/error states). No whole-component snapshots.
- A spec for a `shared/` file may import only `@/shared/*` and test helpers; do not pull `core` or a domain into a shared test.
