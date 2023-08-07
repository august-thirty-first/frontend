FROM node:20-buster

VOLUME ["/root/next"]
EXPOSE 3000

ADD ./run.sh	/scripts/run.sh

WORKDIR /root/next

ENTRYPOINT /scripts/run.sh
