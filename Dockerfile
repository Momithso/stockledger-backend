# Dockerfile
# Multi-stage build: build assets (if any) then run in slim runtime image

# === build stage ===
FROM node:24.8.0-alpine3.22 AS build
WORKDIR /usr/src/app

# Install build deps (optional)
# RUN apk add --no-cache make gcc g++ python3

# Copy and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy app sources
COPY . .

# If you have a build step, run it here (uncomment if needed)
# RUN npm run build

# === runtime stage ===
FROM node:24.8.0-alpine3.22 AS runtime
WORKDIR /usr/src/app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy only production node_modules and app files
COPY --from=build --chown=appuser:appgroup /usr/src/app ./

ENV NODE_ENV=production
EXPOSE 3000

# Healthcheck (simple TCP check)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --spider --quiet http://localhost:3000/health || exit 1

# Start the app
CMD ["npx", "tsx", "--env-file=.env", "--watch", "src/index.ts"]
