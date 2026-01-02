FROM node:20-alpine AS base

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  curl \
  && rm -rf /var/cache/apk/*

ENV NODE_ENV=production \
  TZ=UTC

RUN addgroup -g 10001 -S nodejs && \
  adduser -S expense-api -u 10001 -G nodejs && \
  mkdir -p /usr/src/app && \
  chown -R expense-api:nodejs /usr/src/app

WORKDIR /usr/src/app

COPY --chown=expense-api:nodejs package*.json ./

RUN npm install --omit=dev --ignore-scripts && \
  npm cache clean --force

FROM base AS development

ENV NODE_ENV=development

COPY --chown=expense-api:nodejs . .

RUN npm install --ignore-scripts --include=dev

USER expense-api

EXPOSE 4000 9229

CMD ["npm", "run", "start:debug"]

FROM base AS production-build

COPY --chown=expense-api:nodejs . .

RUN npm install --ignore-scripts --include=dev && \
  npm run build && \
  npm prune --production && \
  rm -rf src

FROM node:20-alpine AS production

RUN apk add --no-cache curl && \
  addgroup -g 10001 -S nodejs && \
  adduser -S expense-api -u 10001 -G nodejs && \
  rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY --from=production-build --chown=expense-api:nodejs /usr/src/app/package*.json ./
COPY --from=production-build --chown=expense-api:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=production-build --chown=expense-api:nodejs /usr/src/app/dist ./dist

RUN mkdir -p logs uploads temp && \
  chown -R expense-api:nodejs logs uploads temp && \
  chmod -R 555 /usr/src/app && \
  chmod -R 755 /usr/src/app/logs /usr/src/app/uploads /usr/src/app/temp

USER expense-api

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["node", "dist/main"]
