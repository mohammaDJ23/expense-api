FROM alpine:latest

RUN apk add --no-cache \
  git \
  jq \
  bash && \
  rm -rf /var/cache/apk/* && \
  addgroup -g 1001 -S detectBranchName && \
  adduser -u 1001 -S user1 -G detectBranchName -h /home/user1 -D

WORKDIR /github/workspace

COPY ./scripts/ci/detectBranchName/index.sh /usr/local/bin/index.sh

RUN test -f /usr/local/bin/index.sh && \
  chmod 550 /usr/local/bin/index.sh && \
  chown user1:detectBranchName /usr/local/bin/index.sh && \
  mkdir -p /github/file_commands && \
  chown -R user1:detectBranchName /github && \
  chmod 755 /github && \
  chmod 755 /github/file_commands

USER user1

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD git --version >/dev/null 2>&1

ENTRYPOINT ["/usr/local/bin/index.sh"]
