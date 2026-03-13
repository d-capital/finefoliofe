FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production

FROM node:18-alpine
WORKDIR /app
# Copy the entire dist folder (contains both /browser and /server)
COPY --from=builder /app/dist/finefolio-fe ./dist/finefolio-fe

# Set the environment to listen on all network interfaces
ENV HOST=0.0.0.0
ENV PORT=4000

EXPOSE 4000
# Run the server entry point (check if your file is .mjs or .js)
CMD ["node", "dist/finefolio-fe/server/server.mjs"]