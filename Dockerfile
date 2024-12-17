# base image
FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3005

CMD ["npm", "run", "dev"]