# Scrum Squads Monorepo

Este monorepo contém os apps **Next.js (frontend)** e **NestJS (backend)** do projeto Scrum Squads.

---

## Estrutura do Monorepo

```
scrum-squads-monorepo/
├─ apps/
│  ├─ admin-dashboard/       # Frontend Next.js
│  ├─ painel-alunos/         # Frontend Next.js
│  └─ backend-nestjs/        # Backend NestJS
├─ packages/                 # Dependências compartilhadas (opcional)
├─ package.json              # Scripts gerais e monorepo
└─ turbo.json                # Configuração Turbo
```

---

## Next.js (Frontend)

- **Admin Dashboard**: `apps/admin-dashboard`
- **Painel Alunos**: `apps/painel-alunos`

### Scripts locais de cada app

No `package.json` de cada app:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

### Rodar em desenvolvimento

```bash
# Rodar um app específico
pnpm dev:admin       # Admin Dashboard
pnpm dev:alunos      # Painel Alunos

# Rodar todos os apps Next.js de uma vez
pnpm dev --filter "apps/*"
```

### Rodar em produção

```bash
pnpm build:admin
pnpm start:admin
```

---

## NestJS (Backend)

- **Backend NestJS**: `apps/backend-nestjs`

### Scripts locais no backend (`package.json` do backend)

```json
"scripts": {
  "start": "node dist/main.js",
  "start:dev": "nest start --watch",
  "build": "nest build"
}
```

### Rodar em desenvolvimento (hot reload)

```bash
pnpm dev:backend
```

### Rodar em produção

```bash
pnpm build:backend
pnpm start:backend
```

---

## Comandos gerais do monorepo

No `package.json` da raiz:

```json
"scripts": {
  "dev": "turbo run dev",
  "build": "turbo run build",
  "lint": "turbo run lint",
  "format": "prettier --write \"**/*.{ts,tsx,md,json}\"",
  "check-types": "turbo run check-types",
  "clean": "rm -rf node_modules && rm -rf apps/*/node_modules && rm -rf packages/*/node_modules && rm -rf .turbo"
}
```

### Rodar todos os apps ao mesmo tempo (Next + Nest)

```bash
pnpm dev
```

### Build de todos os apps

```bash
pnpm build
```

### Limpar node_modules e cache

```bash
pnpm run clean
```

---

## Dicas

- Sempre use `pnpm install` na raiz ao clonar o repositório.
- Para rodar apenas um app específico, utilize os scripts filtrados (`dev:admin`, `dev:backend`, etc.).
- Para desenvolvimento rápido, `pnpm dev` roda todos os apps simultaneamente com Turbo.
- Scripts locais nos apps (`dev`, `build`, `start`) são úteis para rodar direto dentro da pasta do app.
