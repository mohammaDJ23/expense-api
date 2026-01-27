FROM alpine:latest

RUN apk add --no-cache bash && \
  addgroup -g 10001 -S vars && \
  adduser -u 10001 -S user1 -G vars -h /home/user1 -D

WORKDIR /github/workspace

COPY ./index.sh /usr/local/bin/index.sh

RUN test -f /usr/local/bin/index.sh && \
  chmod 550 /usr/local/bin/index.sh && \
  chown user1:vars /usr/local/bin/index.sh

USER user1

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD [ -x /usr/local/bin/index.sh ] || exit 1

ENTRYPOINT ["/usr/local/bin/index.sh"]
