FROM php:8.3-cli-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    unzip \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    zip \
    bash \
    mysql-client \
    postgresql-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pdo_mysql pdo_pgsql pgsql gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Expose port 8000
EXPOSE 8000

# Run artisan serve by default
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
