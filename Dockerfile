FROM node:lts-alpine as builder

# Enable and configure pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable 

WORKDIR /app
COPY . /app


# -------------- Project build Stage -----------------

# Install dependencies and enable cache
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build app
RUN pnpm run build

# ------------------ NGINX Stage --------------------
FROM nginx:alpine as runtime

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html

# Copy built site
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose default Nginx port
EXPOSE 80

# Start Nginx with global directives and daemon turned off
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]


