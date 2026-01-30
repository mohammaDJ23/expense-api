FROM alpine:latest

RUN apk add --no-cache \
  git \
  jq \
  bash && \
  rm -rf /var/cache/apk/* && \
  addgroup -g 1001 -S detectBranchName && \
  adduser -u 1001 -S user1 -G detectBranchName -h /home/user1 -D

WORKDIR /github/workspace

USER user1

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD git --version >/dev/null 2>&1

ENTRYPOINT ["/github/workspace/scripts/ci/detectBranchName/index.sh"]
