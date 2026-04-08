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
- **Dual payment system** — all donations settle to USDT TRC-20 wallet `TPMUHFSebNNJfoeFiusq6TBypbsJy8DByw`
- **Fiat tab** (Card / GCash / Maya / Bank / PayPal): NOWPayments hosted checkout, min ₱50, tiers ₱250/₱500/₱1,000/₱2,500, requires `NOWPAYMENTS_API_KEY` secret
- **Crypto tab** (USDT TRC-20): PayGate.to self-hosted checkout (no API key), min ₱800, tiers ₱1,000/₱2,500/₱5,000/₱10,000
- Fiat flow: form → POST `/api/donate` (paymentMethod:"fiat") → NOWPayments invoice → redirect to hosted checkout
- Crypto flow: form → POST `/api/donate` (paymentMethod:"crypto") → PayGate.to generates TRON address → show address + QR in-page
- Callback endpoint: `GET /api/donate/callback` — called by PayGate.to on crypto payment confirmation

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
