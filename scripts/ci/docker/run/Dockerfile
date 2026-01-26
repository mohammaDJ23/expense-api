FROM docker:dind

RUN apk add --no-cache bash && \
  addgroup -g 10001 -S run && \
  adduser -u 10001 -S user1 -G run -h /home/user1 -D && \
  addgroup user1 docker

WORKDIR /github/workspace

COPY ./scripts/ci/docker/run/index.sh /usr/local/bin/index.sh
COPY ./scripts/common/startDockerSwarm.sh /usr/local/bin/start.sh

RUN test -f /usr/local/bin/index.sh && \
  test -f /usr/local/bin/start.sh && \
  chmod 550 /usr/local/bin/index.sh && \
  chmod 550 /usr/local/bin/start.sh && \
  chown user1:run /usr/local/bin/index.sh /usr/local/bin/start.sh

USER user1

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD docker --version >/dev/null 2>&1

ENTRYPOINT ["/usr/local/bin/index.sh"]

CMD ["dockerd", "--host=unix:///var/run/docker.sock", "--host=tcp://0.0.0.0:2375", "--storage-driver=overlay2"]
