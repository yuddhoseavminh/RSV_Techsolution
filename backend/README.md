# KT Solution Backend

Laravel 12 API scaffold for KT Solution public website content, client portal, and admin management system.

## Stack

- Laravel 12
- MySQL
- Laravel Sanctum token authentication
- Spatie Laravel Permission compatible role and permission tables
- RESTful API routes under `/api/v1`

## Main Modules

- Authentication: register, login, forgot password, profile, logout
- Public website: home, services, portfolio, blog, contact requests
- User portal: dashboard, project tracking, invoices, support tickets, profile
- Admin: users, roles, permissions, clients, projects, services, portfolio, blog, contacts, tickets, invoices, settings

## Install

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

## Documentation

- API endpoints: `docs/API.md`
- Database schema: `docs/DATABASE_SCHEMA.md`
- ERD diagram: `docs/ERD.md`
