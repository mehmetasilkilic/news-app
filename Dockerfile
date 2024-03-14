FROM node:18-alpine

WORKDIR /news-app

COPY package.json .

COPY postcss.config.js .

COPY tailwind.config.js .

COPY tsconfig.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]