FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only-production

COPY --from=0 /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "dist/server.js"]