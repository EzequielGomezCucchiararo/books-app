FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY client ./client

RUN cd client && npm install && npm run build

COPY . .

EXPOSE 4200

# Start the Express app
CMD [ "node", "build/index.js" ]
