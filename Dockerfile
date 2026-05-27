FROM node:24-alpine AS base

ENV COREPACK_INTEGRITY_KEYS=0
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    curl && \
    corepack enable && \
    corepack prepare pnpm@10.29.2 --activate && \
    addgroup -g 1001 -S nodejs && \
    adduser -S expense-api -u 1001 -G nodejs && \
    mkdir -p /usr/src/app && \
    chown -R expense-api:nodejs /usr/src/app

WORKDIR /usr/src/app

COPY --chown=expense-api:nodejs package.json ./
COPY --chown=expense-api:nodejs pnpm-lock.yaml ./
COPY --chown=expense-api:nodejs .npmrc ./

RUN pnpm install --ignore-scripts --frozen-lockfile && \
    pnpm cache clean

FROM base AS development

ENV NODE_ENV=development

COPY --chown=expense-api:nodejs . .

USER expense-api

EXPOSE 4000 9229

CMD ["pnpm", "run", "start:debug"]

FROM base AS production-build

ENV NODE_ENV=production
ENV npm_config_ignore_scripts=true

COPY --chown=expense-api:nodejs . .

RUN pnpm run build && \
    pnpm prune --production && \
    rm -rf src

FROM node:24-alpine AS production

ENV NODE_ENV=production

RUN apk add --no-cache curl && \
    addgroup -g 1001 -S nodejs && \
    adduser -S expense-api -u 1001 -G nodejs && \
    rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY --from=production-build --chown=expense-api:nodejs /usr/src/app/package.json ./
COPY --from=production-build --chown=expense-api:nodejs /usr/src/app/pnpm-lock.yaml ./
COPY --from=production-build --chown=expense-api:nodejs /usr/src/app/.npmrc ./
COPY --from=production-build --chown=expense-api:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=production-build --chown=expense-api:nodejs /usr/src/app/dist ./dist

RUN mkdir -p logs uploads temp && \
    chown -R expense-api:nodejs logs uploads temp && \
    chmod -R 555 /usr/src/app && \
    chmod -R 755 /usr/src/app/logs /usr/src/app/uploads /usr/src/app/temp

USER expense-api

EXPOSE 3000

CMD ["node", "dist/main"]
