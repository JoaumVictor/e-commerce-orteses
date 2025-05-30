FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN yarn

COPY . .

RUN yarn build

RUN yarn add -g serve

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]