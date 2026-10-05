import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const domainInput = process.argv[2];

if (!domainInput) {
  console.error(
    `${colors.red}Error: Please provide a domain name.${colors.reset}\nUsage: pnpm create:domain <domain-name>\nExample: pnpm create:domain inventory`
  );
  process.exit(1);
}

const toKebabCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const toPascalCase = (str) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/[\s-_]+/g, '');

const toCamelCase = (str) => {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const domainName = toKebabCase(domainInput);
const pascalName = toPascalCase(domainName);
const camelName = toCamelCase(domainName);

const domainDir = path.join(rootDir, 'src', 'domains', domainName);

if (fs.existsSync(domainDir)) {
  console.error(`${colors.red}Error: Domain "${domainName}" already exists at ${domainDir}${colors.reset}`);
  process.exit(1);
}

console.log(`${colors.cyan}${colors.bold}⚡ Scaffolding new domain: ${domainName} (${pascalName})...${colors.reset}\n`);

// 1. Create subdirectories
const dirs = ['api', 'components', 'layouts', 'pages', 'stores', 'types'];
for (const subDir of dirs) {
  fs.mkdirSync(path.join(domainDir, subDir), { recursive: true });
}

// 2. Generate api/index.ts
const apiContent = `import { api } from '@/core/lib/api/client';
import type { ${pascalName}Item } from '../types';

export const ${camelName}Api = {
  getOverview: async () => {
    const response = await api.get<${pascalName}Item[]>('/${domainName}/overview');
    return response.data;
  },
};
`;
fs.writeFileSync(path.join(domainDir, 'api', 'index.ts'), apiContent);

// 3. Generate types/index.ts (Anti-Corruption Layer)
const typesContent = `export interface ${pascalName}Item {
  id: string;
  name: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface ${pascalName}State {
  items: ${pascalName}Item[];
  loading: boolean;
  error: string | null;
}
`;
fs.writeFileSync(path.join(domainDir, 'types', 'index.ts'), typesContent);

// 4. Generate stores/use<Pascal>Store.ts
const storeContent = `import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ${pascalName}Item } from '../types';

export const use${pascalName}Store = defineStore('${domainName}', () => {
  const items = ref<${pascalName}Item[]>([]);
  const isLoading = ref<boolean>(false);

  const setItems = (newItems: ${pascalName}Item[]) => {
    items.value = newItems;
  };

  const clear = () => {
    items.value = [];
  };

  return {
    items,
    isLoading,
    setItems,
    clear,
  };
});
`;
fs.writeFileSync(path.join(domainDir, 'stores', `use${pascalName}Store.ts`), storeContent);

// 5. Generate layouts/<Pascal>Layout.vue
const layoutContent = `<script setup lang="ts">
  import { useDarkTheme } from '@/shared/composables';
  import Button from '@/shared/ui/ui/button/Button.vue';
  import Icon from '@/shared/ui/icon/Icon.vue';

  const { toggleDark } = useDarkTheme();
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden bg-bg-surface">
    <!-- Domain Header -->
    <div class="flex min-h-0 min-w-0 flex-1 flex-col">
      <header
        class="border-primary-600/35 flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6"
      >
        <div class="flex items-center gap-3">
          <span class="bg-primary-600/10 text-primary-600 rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider">
            ${pascalName} Portal
          </span>
          <h1 class="text-text-primary text-base font-semibold">
            ${pascalName} Workspace
          </h1>
        </div>

        <div class="flex items-center gap-2">
          <Button test-id="\${domainName}-toggle-dark" variant="ghost" size="icon" @click="toggleDark()">
            <Icon icon="hugeicons--dark-mode" class="size-5" />
          </Button>
        </div>
      </header>

      <!-- Main Domain Content -->
      <main class="min-h-0 min-w-0 flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
`;
fs.writeFileSync(path.join(domainDir, 'layouts', `${pascalName}Layout.vue`), layoutContent);

// 6. Generate pages/<Pascal>Dashboard.vue
const pageContent = `<script setup lang="ts">
  import { use${pascalName}Store } from '../stores/use${pascalName}Store';

  const store = use${pascalName}Store();
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-text-primary text-2xl font-bold tracking-tight">
          ${pascalName} Dashboard
        </h2>
        <p class="text-text-tertiary text-sm">
          Welcome to the isolated \${domainName} domain. Active items: {{ store.items.length }}
        </p>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div class="border-border bg-bg-card rounded-xl border p-5 shadow-xs">
        <h3 class="text-text-tertiary text-xs font-semibold uppercase tracking-wider">Domain</h3>
        <p class="text-text-primary mt-2 text-xl font-bold">${pascalName}</p>
      </div>
      <div class="border-border bg-bg-card rounded-xl border p-5 shadow-xs">
        <h3 class="text-text-tertiary text-xs font-semibold uppercase tracking-wider">Boundary</h3>
        <p class="text-text-primary mt-2 text-xl font-bold">Zero-Trust Guarded</p>
      </div>
      <div class="border-border bg-bg-card rounded-xl border p-5 shadow-xs">
        <h3 class="text-text-tertiary text-xs font-semibold uppercase tracking-wider">Chunk Status</h3>
        <p class="text-primary-600 mt-2 text-xl font-bold">domain-${domainName}</p>
      </div>
    </div>
  </div>
</template>
`;
fs.writeFileSync(path.join(domainDir, 'pages', `${pascalName}Dashboard.vue`), pageContent);

// 7. Generate <domain>.routes.ts
const routesContent = `import type { RouteRecordRaw } from 'vue-router';
import { authGuard } from '@/app/router/guards';

export const ${camelName}Routes: RouteRecordRaw[] = [
  {
    path: '/${domainName}',
    component: () => import('./layouts/${pascalName}Layout.vue'),
    beforeEnter: [authGuard],
    meta: {
      allowedDomains: ['${domainName}'],
    },
    children: [
      {
        path: '',
        name: '${domainName}.dashboard',
        component: () => import('./pages/${pascalName}Dashboard.vue'),
        meta: {
          title: '${pascalName} Dashboard',
          allowedDomains: ['${domainName}'],
        },
      },
    ],
  },
];
`;
fs.writeFileSync(path.join(domainDir, `${domainName}.routes.ts`), routesContent);

console.log(`${colors.green}✔ Domain "${domainName}" successfully scaffolded at src/domains/${domainName}!${colors.reset}`);
console.log(`
${colors.bold}Structure created:${colors.reset}
  src/domains/${domainName}/
  ├── api/index.ts
  ├── components/
  ├── layouts/${pascalName}Layout.vue
  ├── pages/${pascalName}Dashboard.vue
  ├── stores/use${pascalName}Store.ts
  ├── types/index.ts
  └── ${domainName}.routes.ts

${colors.bold}Architecture Highlights:${colors.reset}
  • ${colors.green}Chunk Isolation:${colors.reset} Vite automatically bundles this domain into ${colors.yellow}"domain-${domainName}"${colors.reset} chunk.
  • ${colors.green}Boundary Isolation:${colors.reset} ESLint automatically forbids any imports between "${domainName}" and other domains.
  • ${colors.green}Zero-Trust Routing:${colors.reset} Protected with { allowedDomains: ['${domainName}'] }.

${colors.bold}Next Step to Register in Router:${colors.reset}
  In ${colors.cyan}src/app/router/index.ts${colors.reset}:
    import { ${camelName}Routes } from '@/domains/${domainName}/${domainName}.routes';
    ...
    routes: [ ...${camelName}Routes, ... ]
`);
