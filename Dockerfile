FROM node:20.11-alpine3.19

WORKDIR /home/node/framework_api

RUN apk update && apk upgrade
RUN apk add curl ca-certificates git bash

RUN apk add tzdata
RUN ln -s /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

EXPOSE 3000

USER node

CMD ["tail","-f","/dev/null"]