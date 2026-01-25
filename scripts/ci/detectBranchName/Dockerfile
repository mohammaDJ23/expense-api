FROM alpine:latest

RUN apk add --no-cache \
  git~=2.38 \
  && rm -rf /var/cache/apk/*

RUN addgroup -g 10001 -S detectBranchName && \
  adduser -u 10001 -S user1 -G detectBranchName -h /home/user1 -D

WORKDIR /usr/src/app

COPY ./scripts/detectBranchName/index.sh .

RUN test -f index.sh

RUN chmod 550 index.sh && \
  chown user1:detectBranchName index.sh

USER user1

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD git --version >/dev/null 2>&1

ENTRYPOINT ["./index.sh"]
