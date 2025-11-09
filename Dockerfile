# syntax=docker/dockerfile:1
ARG NODE_VERSION=20-alpine
ARG NGINX_VERSION=alpine

FROM node:${NODE_VERSION} AS builder

# Install build dependencies
RUN apk add --no-cache libc6-compat

# Configure pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy dependency files first for better caching
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application with optimizations
RUN pnpm run build && \
    # Remove source maps and unnecessary files
    find /app/dist -name "*.map" -delete && \
    # Remove dev dependencies
    pnpm prune --prod

# Production stage
FROM nginx:${NGINX_VERSION} AS runtime

# Install security updates and curl for health check
RUN apk --no-cache upgrade && \
    apk --no-cache add curl

# Fix permissions for nginx user
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Remove default nginx assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built application with proper ownership
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config with proper ownership
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Start nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
