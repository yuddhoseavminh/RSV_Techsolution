# KT Solution Frontend

Next.js 15 frontend for the KT Solution public website, user portal, and admin dashboard.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- ShadCN-style component primitives
- Framer Motion
- Lucide icons

## Install

```bash
npm install
npm run dev
```

Set the API URL in `.env.local`:

```text
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## Routes

Public:

- `/`
- `/about`
- `/services`
- `/portfolio`
- `/blog`
- `/contact`
- `/login`
- `/register`
- `/forgot-password`
- `/verify-email`

Portal:

- `/portal/dashboard`
- `/portal/projects`
- `/portal/invoices`
- `/portal/tickets`
- `/portal/profile`

Admin:

- `/admin`
- `/admin/users`
- `/admin/roles`
- `/admin/permissions`
- `/admin/projects`
- `/admin/services`
- `/admin/portfolio`
- `/admin/blog`
- `/admin/contacts`
- `/admin/tickets`
- `/admin/invoices`
- `/admin/settings`
