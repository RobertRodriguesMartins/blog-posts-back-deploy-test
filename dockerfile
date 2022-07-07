FROM node:alpine3.14 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src /app/src

COPY routes.ts index.ts tsconfig.json ./

ENV PORT 3001
ENV MYSQL_HOST localhost
ENV MYSQL_DATABASE devMedia
ENV MYSQL_PASSWORD root
ENV MYSQL_USER root
ENV MYSQL_PORT 3306

RUN npm run build

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]