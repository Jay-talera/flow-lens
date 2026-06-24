# ─── Build Stage ──────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files first (cached layer)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# ─── Run Stage ────────────────────────────────
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx page
RUN rm -rf ./*

# Copy built files
COPY --from=build /app/dist .

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]