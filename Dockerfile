FROM golang:alpine

RUN apk add --no-cache nodejs yarn
RUN apk add --no-cache openjdk8
ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk
ENV PATH="$JAVA_HOME/bin:${PATH}"
RUN apk add --no-cache python3
RUN apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing mono

WORKDIR /usr/src/app

COPY ./core/package.json ./
COPY ./core/yarn.lock ./

RUN yarn --production

COPY ./core .

ENV NODE_ENV="production"
ENV PORT=8080

EXPOSE 8080

CMD [ "node", "Server.js" ]