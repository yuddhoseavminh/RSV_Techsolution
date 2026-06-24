# API Endpoints

Base URL: `/api/v1`

## Public Website

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/home` | Home page stats, featured services, projects, and news |
| GET | `/services` | List active services |
| GET | `/services/{idOrSlug}` | Service details |
| GET | `/portfolio` | Portfolio project list with category filter |
| GET | `/portfolio/{idOrSlug}` | Portfolio project details |
| GET | `/blog` | Published blog posts with search, category, and tag filters |
| GET | `/blog/{idOrSlug}` | Blog post details |
| POST | `/contact-requests` | Submit contact/lead form |

## Authentication

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/auth/register` | Create client account |
| POST | `/auth/login` | Create Sanctum token |
| POST | `/auth/forgot-password` | Queue password reset link |
| GET | `/auth/me` | Current authenticated user |
| POST | `/auth/logout` | Revoke current Sanctum token |

## Portal

Requires `auth:sanctum`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/portal/dashboard` | Client dashboard metrics |
| GET | `/portal/projects` | Client project list |
| GET | `/portal/projects/{project}` | Client project details |
| GET | `/portal/invoices` | Client invoice history |
| GET | `/portal/invoices/{invoice}` | Invoice details |
| GET | `/portal/profile` | Profile details |
| PUT | `/portal/profile` | Update profile |
| GET | `/portal/tickets` | Ticket list |
| POST | `/portal/tickets` | Open ticket |
| GET | `/portal/tickets/{ticket}` | Ticket details with replies |
| POST | `/portal/tickets/{ticket}/replies` | Add ticket reply |

## Admin

Requires `auth:sanctum` and `role:admin|manager`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/admin/dashboard` | Admin statistics and chart data |
| API Resource | `/admin/users` | User CRUD |
| API Resource | `/admin/roles` | Role CRUD |
| GET, SHOW | `/admin/permissions` | Permission listing |
| API Resource | `/admin/clients` | Client CRUD |
| API Resource | `/admin/projects` | Project CRUD and team assignment |
| API Resource | `/admin/service-categories` | Service category CRUD |
| API Resource | `/admin/services` | Service CRUD |
| API Resource | `/admin/technologies` | Technology CRUD |
| API Resource | `/admin/portfolio-projects` | Portfolio CRUD and technology assignment |
| API Resource | `/admin/blog-categories` | Blog category CRUD |
| API Resource | `/admin/blog-posts` | Blog post CRUD and tag assignment |
| API Resource | `/admin/tags` | Tag CRUD |
| GET, SHOW, UPDATE, DELETE | `/admin/contact-requests` | Lead management |
| GET, SHOW, UPDATE, DELETE | `/admin/tickets` | Ticket support management |
| API Resource | `/admin/invoices` | Invoice CRUD |
| GET | `/admin/settings` | Settings list |
| PUT | `/admin/settings` | Settings update |
