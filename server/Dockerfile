FROM node
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

# for typescript
RUN npm run build

COPY .env ./dist/

EXPOSE 5000
CMD ["node" "dist/app.js"]