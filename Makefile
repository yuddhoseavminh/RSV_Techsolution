.PHONY: help dev prod stop clean logs status shell-backend shell-frontend migrate seed

# Default target
help: ## Show this help message
	@echo "Usage: make [command]"
	@echo ""
	@echo "Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Development Commands
dev: ## Start development environment
	docker compose up -d
	@echo "Development environment started!"
	@echo "Backend: http://localhost:8000"
	@echo "Frontend: http://localhost:3000"
	@echo "MySQL: localhost:3306"

# Production Commands
prod: ## Start production environment
	@cp .env.production.example .env.production 2>/dev/null || true
	docker compose -f docker-compose.prod.yml up -d --build
	@echo "Production environment started!"
	@echo "Application: http://localhost"

prod-build: ## Rebuild production images
	docker compose -f docker-compose.prod.yml build --no-cache

prod-logs: ## Show production logs
	docker compose -f docker-compose.prod.yml logs -f

# Stop Commands
stop: ## Stop all containers
	docker compose down
	docker compose -f docker-compose.prod.yml down 2>/dev/null || true

stop-all: ## Stop all containers and remove volumes
	docker compose down -v
	docker compose -f docker-compose.prod.yml down -v 2>/dev/null || true

# Clean Commands
clean: ## Remove all containers, images, and volumes
	docker compose down -v --rmi all
	docker compose -f docker-compose.prod.yml down -v --rmi all 2>/dev/null || true
	@echo "Cleaned up all Docker resources"

# Status Commands
status: ## Show container status
	docker compose ps
	@echo ""
	docker compose -f docker-compose.prod.yml ps 2>/dev/null || true

# Log Commands
logs: ## Show development logs
	docker compose logs -f

logs-backend: ## Show backend logs
	docker compose logs -f backend

logs-frontend: ## Show frontend logs
	docker compose logs -f frontend

# Shell Commands
shell-backend: ## Access backend container shell
	docker compose exec backend sh

shell-frontend: ## Access frontend container shell
	docker compose exec frontend sh

shell-mysql: ## Access MySQL shell
	docker compose exec mysql mysql -u root -psecret

# Database Commands
migrate: ## Run database migrations
	docker compose exec backend php artisan migrate

migrate-fresh: ## Fresh migrate (drops all tables)
	docker compose exec backend php artisan migrate:fresh --seed

seed: ## Run database seeders
	docker compose exec backend php artisan db:seed

# Laravel Commands
cache-clear: ## Clear all caches
	docker compose exec backend php artisan cache:clear
	docker compose exec backend php artisan config:clear
	docker compose exec backend php artisan route:clear
	docker compose exec backend php artisan view:clear

optimize: ## Optimize for production
	docker compose exec backend php artisan config:cache
	docker compose exec backend php artisan route:cache
	docker compose exec backend php artisan view:cache

# Key Generation
generate-key: ## Generate application key
	docker compose exec backend php artisan key:generate

# Permission Fix
fix-permissions: ## Fix storage permissions
	docker compose exec backend chown -R www:www storage bootstrap/cache
	docker compose exec backend chmod -R 775 storage bootstrap/cache
