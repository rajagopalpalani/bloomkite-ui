FROM node:18-slim

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY webpack.config.js postcss.config.js ./
COPY src ./src
COPY public ./public

RUN NODE_OPTIONS="--max-old-space-size=512" npm run build

RUN npm prune --production && \
    rm -rf /tmp/.npm

EXPOSE 8080

ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=512" \
    PORT=8080

CMD ["node", "src/app.js"]
