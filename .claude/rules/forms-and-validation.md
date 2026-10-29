---
paths:
  - "**/schemas/**/*.ts"
  - "**/*.vue"
  - "src/shared/ui/form/**"
---

# Forms and validation

- This starter uses **vee-validate with yup**, not zod. Wire forms with `useForm({ validationSchema: toTypedSchema(schema) })`, where `useForm` comes from `vee-validate` and `toTypedSchema` from `@vee-validate/yup`.
- Schemas live in the owning layer's `schemas/` folder, for example `core/auth/schemas/login.schema.ts`. Export `schema` and a form type derived from it:

  ```ts
  export const schema = yup.object({ ... });
  export type LoginForm = Partial<yup.InferType<typeof schema>>;
  ```

  Reuse the inferred type. Do not hand-write a second copy of the shape.
- Reusable rules come from `@/shared/lib/yup`: `phoneSchema`, `passwordSchema`, `positiveNumberSchema`, `percentageSchema`, `requiredMediaSchema`, `optionalMediaSchema`. `setupYupLocale()` runs once in `src/app/main.ts`, so messages come from the `yup` locale namespace. Add new messages to `src/shared/locales/{en,ar}/yup.json`.
- Do not hardcode error strings on `.required()`, `.email()`, or `.min()`. Omit them so Yup uses `yup.json`, and set `.label()` so `{path}` reads as a field name.
- Field components come from `@/shared/ui/form` (for example `Field.Text`, `Field.Password`, `Field.Select`). Match the wiring of the nearby form.
- Server errors go to fields with `applyApiErrorToForm(error, ctx.setErrors, '<field>')` from `@/shared/utils/apiError`, as `useLoginMutation` does.
- Uploads use `useFormMedia` and `useUploadImage` from `@/shared/composables`. Pass `MediaValue` through `extractMediaPayload`.
- Multi-step forms use `useMultiStepForm` with `MultiStepForm.vue` and `StepIndicator.vue` from `@/shared/ui/form`.
