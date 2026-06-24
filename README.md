# KT Solution Website and Management System

This workspace contains two project folders:

- `frontend`: Next.js 15 App Router, TypeScript, Tailwind CSS, ShadCN-style UI primitives, Framer Motion, responsive public website, client portal, and admin dashboard.
- `backend`: Laravel 12 API architecture with MySQL schema, Sanctum authentication, role and permission management, public APIs, portal APIs, and admin APIs.

## Structure

```text
.
├── backend
│   ├── app
│   ├── bootstrap
│   ├── config
│   ├── database
│   ├── docs
│   ├── public
│   └── routes
└── frontend
    ├── app
    ├── components
    ├── lib
    ├── public
    └── types
```

## Local Setup

Backend:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000/api/v1`

Demo seeded users:

- Admin: `admin@ktsolution.local` / `password`
- Client: `client@example.com` / `password`
