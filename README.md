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
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   ├── public
│   └── types
├── nginx
│   ├── default.conf          # Production nginx config
│   └── production.conf       # SSL nginx config (optional)
├── docker-compose.yml        # Development
├── docker-compose.prod.yml   # Production
├── Makefile                  # Common commands
└── .env.production           # Production environment
```

---

## Local Development Setup

### Option 1: Using Docker (Recommended)

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

Default local URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000/api/v1`
- Nginx: `http://localhost`
- MySQL: `localhost:3306`

### Option 2: Manual Setup

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

### Demo Users

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@ktsolution.local` | `password` |
| Client | `client@example.com` | `password` |

---

## Production Deployment Guide

### Prerequisites

- Ubuntu 20.04/22.04/24.04 LTS server
- Docker and Docker Compose installed
- Domain name pointing to your server
- SSH access to server

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose plugin
sudo apt install docker-compose-plugin -y

# Logout and login again for group changes
logout
```

### Step 2: Clone Repository

```bash
# Clone the project
git clone <your-repo-url> /var/www/rsv-techsolution
cd /var/www/rsv-techsolution

# Set permissions
chmod -R 755 storage bootstrap/cache
```

### Step 3: Configure Environment

```bash
# Copy and edit production environment
cp .env.production.example .env.production
nano .env.production
```

**Update these values:**

```bash
# App
APP_URL=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com

# Database (use strong passwords!)
DB_PASSWORD=your_secure_password_here
DB_ROOT_PASSWORD=your_secure_root_password_here

# Sanctum
SANCTUM_STATEFUL_DOMAINS=yourdomain.com,www.yourdomain.com
SESSION_DOMAIN=yourdomain.com
```

### Step 4: Update Nginx Configuration

```bash
# Edit nginx config for your domain
nano nginx/default.conf
```

Change `server_name`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    # ... rest of config
}
```

### Step 5: Build and Deploy

```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Start all services
docker compose -f docker-compose.prod.yml up -d

# Check status
docker compose -f docker-compose.prod.yml ps
```

### Step 6: Database Setup

```bash
# Run migrations
docker compose -f docker-compose.prod.yml exec backend php artisan migrate --force

# Seed database (optional)
docker compose -f docker-compose.prod.yml exec backend php artisan db:seed --force

# Generate application key (if not set in .env)
docker compose -f docker-compose.prod.yml exec backend php artisan key:generate
```

### Step 7: Optimize for Production

```bash
# Cache configurations
docker compose -f docker-compose.prod.yml exec backend php artisan config:cache
docker compose -f docker-compose.prod.yml exec backend php artisan route:cache
docker compose -f docker-compose.prod.yml exec backend php artisan view:cache
docker compose -f docker-compose.prod.yml exec backend php artisan event:cache

# Fix permissions
docker compose -f docker-compose.prod.yml exec backend chown -R www:www storage bootstrap/cache
```

### Step 8: Setup SSL (Recommended)

```bash
# Install Certbot
sudo apt install certbot -y

# Stop nginx temporarily
docker compose -f docker-compose.prod.yml stop nginx

# Get SSL certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Update nginx config with SSL
nano nginx/default.conf
```

Uncomment the SSL server block and update certificate paths:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    # ... rest of config
}
```

Update docker-compose.prod.yml to mount certificates:

```yaml
nginx:
  volumes:
    - /etc/letsencrypt:/etc/letsencrypt:ro
```

Restart nginx:

```bash
docker compose -f docker-compose.prod.yml up -d nginx
```

### Alternative: Using Cloudflare Tunnel (Recommended)

Cloudflare Tunnel is a better option than traditional SSL setup. It provides:
- No open ports on your server
- Automatic SSL without certbot
- DDoS protection
- Global CDN

**Setup:**

```bash
# Install cloudflared
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb

# Login to Cloudflare
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create rsv-techsolution

# Configure tunnel
cat > ~/.cloudflared/config.yml << EOF
tunnel: <YOUR_TUNNEL_ID>
credentials-file: /root/.cloudflared/<YOUR_TUNNEL_ID>.json
ingress:
  - hostname: yourdomain.com
    service: http://rsv_nginx:80
  - service: http_status:404
EOF

# Start tunnel
cloudflared tunnel run rsv-techsolution
```

**Note:** When using Cloudflare Tunnel, you can remove port exposure from `docker-compose.prod.yml`:

```yaml
nginx:
  # Remove ports section - not needed with tunnel
  # ports:
  #   - "80:80"
  #   - "443:443"
```

---

## Useful Commands

### Development

```bash
make dev                    # Start development
make dev-build             # Rebuild and start
make stop                  # Stop all services
make logs                  # View logs
make shell                 # Access app shell
```

### Production

```bash
make prod                  # Start production
make prod-build            # Rebuild production
make prod-deploy           # Full deployment
make prod-logs             # View production logs
```

### Database

```bash
make migrate               # Run migrations
make seed                  # Seed database
make fresh                 # Fresh migrate + seed
make db-shell              # Access database shell
```

### Troubleshooting

```bash
# View container logs
docker compose -f docker-compose.prod.yml logs -f

# Check specific service
docker compose -f docker-compose.prod.yml logs -f backend

# Access container shell
docker compose -f docker-compose.prod.yml exec backend sh

# Restart a service
docker compose -f docker-compose.prod.yml restart backend

# Full rebuild (if images are corrupted)
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d
```

---

## Health Check

Test if the application is running:

```bash
# Test API health
curl https://yourdomain.com/api/v1/health

# Expected response:
# {
#   "status": "ok",
#   "timestamp": "2026-09-04T12:00:00.000000Z",
#   "services": {
#     "database": "connected",
#     "cache": "connected"
#   }
# }
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      INTERNET                           │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                     NGINX (80/443)                      │
│                   Reverse Proxy                         │
└───────────┬─────────────────────────────┬───────────────┘
            │                             │
            ▼                             ▼
┌───────────────────────┐   ┌─────────────────────────────┐
│   Frontend (Next.js)  │   │    Backend (Laravel API)     │
│      Port: 3000       │   │       Port: 9000            │
└───────────────────────┘   └──────────────┬──────────────┘
                                           │
                          ┌────────────────┼────────────────┐
                          ▼                ▼                ▼
                   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
                   │    MySQL    │  │    Redis    │  │   Storage   │
                   │   Port:3306 │  │   Port:6379 │  │             │
                   └─────────────┘  └─────────────┘  └─────────────┘
```

---

## Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
sudo lsof -i :80
sudo lsof -i :443

# Kill the process or change port in docker-compose.prod.yml
```

### Permission Denied

```bash
# Fix storage permissions
docker compose -f docker-compose.prod.yml exec backend chown -R www:www storage bootstrap/cache
docker compose -f docker-compose.prod.yml exec backend chmod -R 775 storage bootstrap/cache
```

### Database Connection Failed

```bash
# Check if MySQL is running
docker compose -f docker-compose.prod.yml ps mysql

# Check logs
docker compose -f docker-compose.prod.yml logs mysql

# Verify credentials in .env.production match docker-compose.prod.yml
```

### Application Key Not Set

```bash
docker compose -f docker-compose.prod.yml exec backend php artisan key:generate
```

### Cache Issues

```bash
docker compose -f docker-compose.prod.yml exec backend php artisan cache:clear
docker compose -f docker-compose.prod.yml exec backend php artisan config:clear
docker compose -f docker-compose.prod.yml exec backend php artisan route:clear
docker compose -f docker-compose.prod.yml exec backend php artisan view:clear
```

---

## Backup

### Database Backup

```bash
# Create backup
docker compose -f docker-compose.prod.yml exec mysql mysqldump -u root -p rsv_techsolution > backup_$(date +%Y%m%d).sql

# Restore backup
docker compose -f docker-compose.prod.yml exec -T mysql mysql -u root -p rsv_techsolution < backup_20260904.sql
```

### Full Backup

```bash
# Backup database
docker compose -f docker-compose.prod.yml exec mysql mysqldump -u root -p rsv_techsolution > db_backup.sql

# Backup storage
tar -czf storage_backup.tar.gz storage/

# Backup environment
cp .env.production .env.production.backup
```

---

## License

Proprietary - KT Solution
