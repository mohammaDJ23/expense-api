FROM docker:cli

RUN apk add --no-cache bash curl && \
  addgroup -g 1001 -S checkHealthy && \
  adduser -u 1001 -S user1 -G checkHealthy -h /home/user1 -D && \
  addgroup user1 docker

WORKDIR /github/workspace

COPY ./scripts/ci/docker/checkHealthy/index.sh /usr/local/bin/index.sh

RUN test -f /usr/local/bin/index.sh && \
  chmod 550 /usr/local/bin/index.sh && \
  chown user1:checkHealthy /usr/local/bin/index.sh

USER user1

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD docker --version >/dev/null 2>&1

ENTRYPOINT ["/usr/local/bin/index.sh"]
