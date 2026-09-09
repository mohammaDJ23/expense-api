FROM node:24-alpine AS node-patched

ENV COREPACK_INTEGRITY_KEYS=0
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN apk update && \
    apk upgrade --available && \
    addgroup -g 1001 -S nodejs && \
    adduser -S expense-api -u 1001 -G nodejs && \
    mkdir -p /usr/src/app && \
    chown -R expense-api:nodejs /usr/src/app

FROM node-patched AS base

RUN corepack enable && \
    corepack prepare pnpm@10.29.2 --activate

WORKDIR /usr/src/app

COPY --chown=expense-api:nodejs package.json ./
COPY --chown=expense-api:nodejs pnpm-lock.yaml ./
COPY --chown=expense-api:nodejs .npmrc ./

FROM base AS installed-packages

RUN pnpm install \
    --ignore-scripts \
    --frozen-lockfile

FROM installed-packages AS development

ENV NODE_ENV=development

COPY --chown=expense-api:nodejs . .

USER expense-api

EXPOSE 4000 9229

ENTRYPOINT ["sh", "-c", "pnpm run db:push && pnpm run start:debug"]

FROM installed-packages AS db-migration-build

ENV NODE_ENV=production
ENV npm_config_ignore_scripts=true

RUN pnpm prune --production

COPY --chown=expense-api:nodejs drizzle.config.ts ./
COPY --chown=expense-api:nodejs drizzle ./drizzle

FROM node-patched AS db-migration

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=db-migration-build --chown=expense-api:nodejs /usr/src/app/package.json ./
COPY --from=db-migration-build --chown=expense-api:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=db-migration-build --chown=expense-api:nodejs /usr/src/app/drizzle.config.ts ./
COPY --from=db-migration-build --chown=expense-api:nodejs /usr/src/app/drizzle ./drizzle

USER expense-api

# Since docker security scan is catching some vulnerability from pnpm,
# it's been used drizzle-kit directly from node-modules
ENTRYPOINT ["./node_modules/.bin/drizzle-kit", "migrate"]

FROM installed-packages AS production-build

ENV NODE_ENV=production
ENV npm_config_ignore_scripts=true

COPY --chown=expense-api:nodejs . .

RUN pnpm run build && \
    pnpm prune --production && \
    rm -rf src

FROM node-patched AS production

ENV NODE_ENV=production

RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY --from=production-build --chown=expense-api:nodejs /usr/src/app/package.json ./
COPY --from=production-build --chown=expense-api:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=production-build --chown=expense-api:nodejs /usr/src/app/dist ./dist

RUN chmod -R 555 /usr/src/app

USER expense-api

EXPOSE 3000

ENTRYPOINT ["node", "dist/main"]
