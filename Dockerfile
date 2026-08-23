# Multi-stage Dockerfile for SkillPods Full-Stack Application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy full source code
COPY . .

# Build Vite frontend and Express server bundle
RUN npm run build

# Production runner stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package manifests and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data

# Expose server port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the bundled Express + SPA server
CMD ["node", "dist/server.cjs"]
