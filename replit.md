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
- Real payment integration via **PayGate.to** (no API key, no signup) — donations settle to USDT TRC-20 wallet `TPMUHFSebNNJfoeFiusq6TBypbsJy8DByw`
- Donation flow: fill form → POST `/api/donate` → PayGate.to generates unique TRON receiving address → donor sends USDT to address → PayGate.to auto-forwards to fund wallet
- No API key required — PayGate.to is fully open access
- Minimum donation: ₱1,000 (~17 USDT) due to TRC-20 network minimums
- Donation tiers: ₱1,000 / ₱2,500 / ₱5,000 / ₱10,000 / custom
- Callback endpoint: `GET /api/donate/callback` — called by PayGate.to on payment confirmation

### API Server (`artifacts/api-server`)
- Express 5 backend
- `POST /api/donate` — calls PayGate.to to generate USDT TRC-20 address, returns `{ donationId, addressIn, amountUsdt, qrCode, ... }`
- `GET /api/donate/callback` — PayGate.to webhook to confirm payment

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
