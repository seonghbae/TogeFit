FROM node:18-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY . .

RUN npm run build

COPY .env ./dist/

COPY package.json ./dist/

WORKDIR /app/dist

RUN npm install

EXPOSE 5000

CMD ["pm2-runtime", "--name", "server", "start", "npm", "--", "run", "js-start"]