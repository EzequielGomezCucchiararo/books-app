FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "node", "build/index.js" ]
