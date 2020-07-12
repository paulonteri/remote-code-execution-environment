FROM node:12-alpine

RUN apk add --no-cache openjdk8
RUN apk add --no-cache python3

WORKDIR /usr/src/app

COPY ./core/package.json ./
COPY ./core/yarn.lock ./

RUN yarn

# RUN npm ci --only=production

# Bundle app source
COPY ./core .

ENV PORT 8080

EXPOSE 8080

CMD [ "node", "Server.js" ]