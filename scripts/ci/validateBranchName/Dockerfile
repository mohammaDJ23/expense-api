FROM node:20-alpine

RUN apk add --no-cache \
  git~=2.38 \
  jq && \
  rm -rf /var/cache/apk/* && \
  npm install -g branch-name-lint && \
  addgroup -g 10001 -S validateBranchName && \
  adduser -u 10001 -S user1 -G validateBranchName -h /home/user1 -D

WORKDIR /github/workspace

COPY ./scripts/ci/validateBranchName/index.sh /usr/local/bin/index.sh 

RUN test -f /usr/local/bin/index.sh && \
  chmod 550 /usr/local/bin/index.sh && \
  chown user1:validateBranchName /usr/local/bin/index.sh

USER user1

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD git --version >/dev/null 2>&1 && node --version >/dev/null 2>&1

ENTRYPOINT ["/usr/local/bin/index.sh"]
