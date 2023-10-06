FROM node:alpine
WORKDIR /app

COPY package.json .
RUN yarn install
COPY . .

CMD ["yarn","dev"]
EXPOSE 8080
