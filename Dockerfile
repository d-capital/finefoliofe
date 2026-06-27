# Stage 1: Build the Angular SSR application
FROM node:20-alpine AS builder
WORKDIR /app

# Ensure devDependencies (like @angular/cli) are installed
ENV NODE_ENV=development

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production runtime for Angular SSR
FROM node:20-alpine
WORKDIR /app

# Only production dependencies are needed here
ENV NODE_ENV=production

# Copy the built SSR application from the builder stage
COPY --from=builder /app/dist/finefolio-fe ./dist/finefolio-fe

# Express server defaults to 4000
ENV PORT=4000
EXPOSE 4000

# Run the Angular SSR Express server
CMD ["node", "dist/finefolio-fe/server/server.mjs"]
