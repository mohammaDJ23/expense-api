FROM node:20-alpine

RUN apk add --no-cache \
  git~=2.38 \
  jq && \
  rm -rf /var/cache/apk/* && \
  npm install -g \
    semantic-release \
    @semantic-release/changelog \
    @semantic-release/git \
    @semantic-release/github \
    @semantic-release/npm && \
  addgroup -g 10001 -S createVersion && \
  adduser -u 10001 -S user1 -G createVersion -h /home/user1 -D

WORKDIR /github/workspace

COPY ./scripts/ci/createVersion/index.sh /usr/local/bin/index.sh

RUN test -f /usr/local/bin/index.sh && \
  chmod 550 /usr/local/bin/index.sh && \
  chown user1:createVersion /usr/local/bin/index.sh

USER user1

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD git --version >/dev/null 2>&1 && node --version >/dev/null 2>&1

ENTRYPOINT ["/usr/local/bin/index.sh"]
