# ===== Stage 1: build =====
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy full project
COPY . .

# Build frontend (VITE_API_URL=/api is hardcoded into the build)
RUN npx vite build


# ===== Stage 2: nginx =====
FROM nginx:alpine

# Copy nginx config as a template for environment variable substitution
# Nginx will automatically process this and output to /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx-template.conf /etc/nginx/templates/default.conf.template

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 81

# Standard entrypoint handles envsubst for templates
CMD ["nginx", "-g", "daemon off;"]
