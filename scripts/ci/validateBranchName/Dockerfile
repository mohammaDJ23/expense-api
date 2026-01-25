FROM node:18-alpine

RUN apk add --no-cache \
  git~=2.38 \
  && rm -rf /var/cache/apk/*

RUN addgroup -g 10001 -S validateBranchName && \
  adduser -u 10001 -S user1 -G validateBranchName -h /home/user1 -D

WORKDIR /usr/src/app

COPY ./scripts/validateBranchName/index.sh .
COPY .branch.namerc.json .

RUN test -f index.sh && test -f .branch.namerc.json

RUN chmod 550 index.sh && \
  chmod 444 .branch.namerc.json && \
  chown user1:validateBranchName index.sh .branch.namerc.json

USER user1

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD git --version >/dev/null 2>&1 && node --version >/dev/null 2>&1

ENTRYPOINT ["./index.sh"]
