FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production

FROM node:20-alpine
WORKDIR /app
# Copy the entire dist folder
COPY --from=builder /app/dist/finefolio-fe ./dist/finefolio-fe

# Set these so the server knows where to listen
ENV HOST=0.0.0.0
ENV PORT=4000
EXPOSE 4000

# Point to the specific entry point discovered
CMD ["node", "dist/finefolio-fe/server/main.server.mjs"]