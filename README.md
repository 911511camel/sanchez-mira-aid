# Barangay Health Support Fund (Sanchez Mira)

A humanitarian fundraising website for the **Barangay Health Support Fund (BHSF)** — improving healthcare access for rural barangays of **Sanchez Mira, Cagayan, Philippines**.

## About the project

Sanchez Mira is a 3rd-class coastal municipality in the province of Cagayan, Philippines. It covers 218.77 km² and has a population of over 26,000 people across 18 barangays. Formerly called Malolokit, it was named after Spanish Brigadier General Manuel Sanchez Mira in 1884.

The Barangay Health Support Fund supports:

- **Medicines for Rural Families** — essential medicines, first-aid kits, and acute care supplies delivered to homes
- **Mobile Doctor Visits** — licensed physicians on scheduled rounds to remote barangays
- **Child and Maternal Health** — prenatal care, immunizations, and nutrition support

## Donations

Three payment options on the site:

| Tab | Provider | Notes |
|---|---|---|
| Card / GCash | HitPay | Hosted checkout; requires `HITPAY_API_KEY` + `HITPAY_SALT` secrets |
| Bank Transfer | — | Manual transfer details shown in-page |
| Crypto | NOWPayments | Hosted checkout; requires `NOWPAYMENTS_API_KEY` + `NOWPAYMENTS_IPN_SECRET` secrets |

## Tech stack

- **Monorepo**: pnpm workspaces + TypeScript
- **Website**: React 19, Vite 7, Tailwind CSS 4, wouter, framer-motion
- **API server**: Express 5, esbuild-bundled ESM
- **Validation**: Zod v4

## Getting started

```bash
pnpm install
pnpm run typecheck
pnpm --filter @workspace/api-server run dev   # API on port 8080
pnpm --filter @workspace/bhsf-website run dev  # website (requires PORT + BASE_PATH env)
```

## Production build

```bash
# Website → artifacts/bhsf-website/dist/public
PORT=25196 BASE_PATH=/ pnpm --filter @workspace/bhsf-website run build

# API server → artifacts/api-server/dist
NODE_ENV=production pnpm --filter @workspace/api-server run build
```

## License

MIT
