# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Barangay Health Support Fund (`artifacts/bhsf-website`)
- React + Vite fundraising website
- Sections: Hero, Mission, Programs, Impact, Donation, Contact, Footer
- Real payment integration via **NOWPayments** — donations settle to USDT TRC-20 wallet `TPMUHFSebNNJfoeFiusq6TBypbsJy8DByw`
- Donation flow: fill form → POST `/api/donate` → redirects to NOWPayments checkout → donor pays → NOWPayments settles USDT
- `NOWPAYMENTS_API_KEY` must be set in secrets
- **Important**: set your USDT payout wallet in NOWPayments dashboard → Settings → Store Settings → Payout Wallet

### API Server (`artifacts/api-server`)
- Express 5 backend
- `POST /api/donate` — creates NOWPayments invoice, returns `{ checkoutUrl, invoiceId }`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
