# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=20.12.2
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# 1️⃣ Install deps in a separate stage (cached with BuildKit)
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci

# 2️⃣ Build Next.js (Mongoose schema code gets bundled too)
FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# ⚡ Optional: standalone build for much smaller runtime
# next.config.js → module.exports = { output: 'standalone' }
RUN npm run build

# 3️⃣ Final runtime image
FROM base AS runner
ENV NODE_ENV=production
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy only what's needed
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./
COPY package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "start"]

