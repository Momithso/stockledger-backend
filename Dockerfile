# Dockerfile
# === base ===
FROM node:24.8.0-alpine3.22 AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./

# === dev ===
FROM base AS dev
ENV NODE_ENV=development
RUN npm ci              # alle deps, inkl. dev
COPY . .
CMD ["npx", "tsx", "--env-file=.env", "--watch", "src/index.ts"]

# === build ===
FROM base AS build
ENV NODE_ENV=production
RUN npm ci              # inkl. dev (für tsc)
COPY . .
RUN npx tsc             # kompiliert nach /dist

# === runtime ===
FROM node:24.8.0-alpine3.22 AS runtime
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev   # nur prod deps

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]

