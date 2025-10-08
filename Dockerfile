FROM node:24-alpine AS builder

WORKDIR /app

COPY ./ ./

RUN npm install 

RUN npm run build

FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 4200

CMD ["node", "./dist/index.js"]
