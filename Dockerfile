FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app/react-app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build
