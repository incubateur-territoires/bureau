# ==============================================================================
# Dockerfile - Bureau ANCT
# ==============================================================================
# Multi-stage build utilisant le mode "standalone" de Next.js
# (voir https://nextjs.org/docs/app/api-reference/config/next-config-js/output)

# Stage 1: Build de l'application
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
COPY next.config.ts ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Image de production
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copie du serveur standalone + static + public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]