FROM node:current-alpine3.18

RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

VOLUME ["/root/next"]
EXPOSE 3000

ADD ./run.sh	/scripts/run.sh

WORKDIR /root/next

ENTRYPOINT /scripts/run.sh
