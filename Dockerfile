FROM node:18

WORKDIR /usr/src/app

COPY package-lock.json ./
COPY package.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3034
EXPOSE 5432

ENV NODE_ENV production

CMD ["node", "dist/main.js"]