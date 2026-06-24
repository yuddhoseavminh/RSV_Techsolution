# Database Schema

The primary migration is `database/migrations/2026_06_24_000001_create_kt_solution_schema.php`.

## Identity and Access

- `users`
- `personal_access_tokens`
- `password_reset_tokens`
- `roles`
- `permissions`
- `model_has_roles`
- `model_has_permissions`
- `role_has_permissions`

## Website Content

- `service_categories`
- `services`
- `technologies`
- `portfolio_projects`
- `portfolio_project_images`
- `portfolio_project_technology`
- `portfolio_project_service`
- `blog_categories`
- `blog_posts`
- `tags`
- `blog_post_tag`
- `settings`

## Business Management

- `clients`
- `projects`
- `project_user`
- `contact_requests`
- `lead_activities`
- `tickets`
- `ticket_replies`
- `invoices`
- `invoice_items`

## Key Relationships

- A client has many projects and portfolio projects.
- A project belongs to a client and can be assigned to many users.
- A user can have many tickets and invoices.
- A ticket belongs to a user and optionally a project.
- A ticket has many replies.
- An invoice belongs to a client, project, and user, and has many invoice items.
- A portfolio project can have many technologies and images.
- A blog post belongs to a category, author, and many tags.
- Roles and permissions use Spatie-compatible pivot tables.
