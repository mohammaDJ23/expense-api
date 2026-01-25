FROM docker:cli

RUN apk add --no-cache bash

RUN addgroup -g 10001 -S pushDockerImage && \
  adduser -u 10001 -S user1 -G pushDockerImage -h /home/user1 -D

WORKDIR /app

COPY ./scripts/pushDockerImage/index.sh .

RUN test -f index.sh && \
  chmod 550 index.sh && \
  chown user1:pushDockerImage index.sh

USER user1

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD docker --version >/dev/null 2>&1

ENTRYPOINT ["./index.sh"]
