# Master Brush Backend

Node.js + Express API for the Master Brush platform providing leads, painter onboarding, colour catalogue management, and visualiser project persistence.

## Prerequisites

- Node.js 18+
- npm 9+
- Docker (for containerised workflows)
- MySQL 8 (local or via Docker)

## Setup

```powershell
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

### Environment

Copy `.env.example` to `.env` and adjust credentials. The app expects a reachable MySQL database defined in `DATABASE_URL`.

### Database

To run MySQL via Docker:

```powershell
docker compose up mysql
```

Run migrations:

```powershell
npm run prisma:migrate
```

Seed demo data:

```powershell
npm run seed
```

Seeded super admin credentials (update before production):

- Email: `admin@masterbrush.local`
- Password: `ChangeMe123!`

## Scripts

- `npm run dev` – start API in watch mode
- `npm run build` – build TypeScript output
- `npm run start` – serve compiled build
- `npm run lint` – lint codebase
- `npm run test` – unit tests
- `npm run test:e2e` – API smoke tests

## Docker

Build image:

```powershell
docker build -t masterbrush-api .
```

Run with dependencies:

```powershell
docker compose up
```

## API Docs

Swagger UI available at `/docs` when server is running. OpenAPI definition lives in `openapi.yaml`.

## Notifications

Email and SMS integrations use SendGrid and Twilio credentials. When these environment variables are absent the app logs mock notifications.

## Manual QA Checklist

- Submit a lead from the homepage form → verify entry appears in `/api/leads` as an admin.
- Submit the “Become a Painter” form with documents → approve/reject via admin and confirm notification logs.
- Save a visualiser project → fetch via `/api/visualiser/{id}` and ensure downloadable assets respond.
- Create/edit/delete colours via admin endpoints → confirm updates propagate to `/api/colors` responses.

## Testing Notes

E2E tests require a running database. Configure `DATABASE_URL` in `.env.test` before executing `npm run test:e2e`.
