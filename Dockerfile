FROM node:10
WORKDIR /scripts
ADD package.json /scripts/package.json
ADD server /scripts/server
ADD client /scripts/client
ADD config.js /scripts/config.js
RUN npm install
CMD ["/scripts/node_modules/.bin/nodemon", "/scripts/server/index.js"]

