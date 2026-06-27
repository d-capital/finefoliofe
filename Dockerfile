# Use Node 20 for Angular 19 compatibility
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist/finefolio-fe ./dist/finefolio-fe

# Express server defaults to 4000
ENV PORT=4000
EXPOSE 4000

# This is the file that actually 'stays alive'
CMD ["node", "dist/finefolio-fe/server/server.mjs"]