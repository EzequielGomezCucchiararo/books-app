FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN cd client && npm install && npm run build

RUN npm run build

EXPOSE 4200

CMD [ "node", "build/index.js" ]
