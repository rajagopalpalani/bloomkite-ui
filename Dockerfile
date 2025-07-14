FROM alpine:latest

RUN apk add --no-cache nodejs npm git

RUN node --version

RUN npm -v

#WORKDIR /app

COPY . .

RUN npm install

RUN npm run build:client

RUN npm run build:server

RUN npm run build:node

EXPOSE 8080

#ENTRYPOINT ["npm"]

CMD ["npm", "start"]
