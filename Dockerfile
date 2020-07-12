FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

# RUN npm ci --only=production

# Bundle app source
COPY ./core .

EXPOSE 8080
CMD [ "node", "Server.js" ]