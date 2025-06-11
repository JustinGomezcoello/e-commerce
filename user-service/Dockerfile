FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm rebuild

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
