# Stage 1: Build Angular Frontend
FROM node:22-alpine AS build-web

WORKDIR /app

COPY package.json package-lock.json ./

COPY apps/web ./apps/web

RUN npm ci
RUN npm run build:web

# Stage 2: Build NestJS Backend
FROM node:22-alpine AS build-api

WORKDIR /app

COPY package.json package-lock.json ./

COPY apps/api ./apps/api

RUN npm ci

RUN npm run build:api

# Stage 3: Production Runtime
FROM node:22-alpine

WORKDIR /app

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

COPY package.json package-lock.json ./

# Copy built API from build-api stage
COPY --from=build-api /app/apps/api/dist ./dist/api
COPY --from=build-api /app/node_modules ./node_modules

# Copy built Web from build-web stage
COPY --from=build-web /app/apps/web/dist/browser ./web/dist/browser

# Expose port
EXPOSE 3000

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/api/main.js"]
