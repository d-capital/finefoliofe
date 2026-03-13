FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine-slim
WORKDIR /app
# Copy the built server and browser files
COPY --from=builder /app/dist/finefolio-fe ./dist/finefolio-fe

EXPOSE 4000
# Start the Node.js server instead of Nginx
CMD ["node", "dist/finefolio-fe/server/server.mjs"]