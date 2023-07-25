FROM node:20.5.0-alpine3.18

VOLUME ["/root/next"]
EXPOSE 3000

ADD ./run.sh	/scripts/run.sh

WORKDIR /root/next

ENTRYPOINT /scripts/run.sh start
