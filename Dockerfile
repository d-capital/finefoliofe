# Stage 1: Build the Angular SSR application
FROM node:20-alpine AS builder
WORKDIR /app

# Bypass npm production locks explicitly
ENV NODE_ENV=development

COPY package*.json ./
RUN npm ci
COPY . .

# GUARANTEED FIX: Force npx to resolve, pull, and run the Angular build toolchain
RUN npx -p @angular/cli ng build

# Stage 2: Production runtime for Angular SSR
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy built application to production container
COPY --from=builder /app/dist/finefolio-fe ./dist/finefolio-fe

ENV PORT=4000
EXPOSE 4000

CMD ["node", "dist/finefolio-fe/server/server.mjs"]
