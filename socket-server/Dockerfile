# Build stage
FROM node AS builder
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node
ENV NODE_ENV=production

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --production

COPY --from=builder /app/dist ./dist

COPY .env ./dist/

EXPOSE 7000
CMD ["node", "dist/cluster.js"]
