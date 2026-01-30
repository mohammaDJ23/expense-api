FROM alpine:latest

RUN apk add --no-cache \
  git \
  jq \
  bash && \
  rm -rf /var/cache/apk/*
  # addgroup -g 10001 -S detectBranchName && \
  # adduser -u 10001 -S user1 -G detectBranchName -h /home/user1 -D

WORKDIR /github/workspace

COPY ./scripts/ci/detectBranchName/index.sh /usr/local/bin/index.sh

RUN chmod +x /usr/local/bin/index.sh

# RUN test -f /usr/local/bin/index.sh && \
#   chmod 550 /usr/local/bin/index.sh && \
#   chown user1:detectBranchName /usr/local/bin/index.sh

# USER user1

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD git --version >/dev/null 2>&1

ENTRYPOINT ["/usr/local/bin/index.sh"]
