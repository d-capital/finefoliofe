# Этап 1: сборка приложения (используем образ с Node.js)
FROM node:18-alpine AS builder

# Устанавливаем рабочий каталог
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci


# Копируем исходники проекта
COPY . .

# Собираем приложение в продакшен‑режиме
# (Angular CLI автоматически использует конфигурацию из angular.json)
RUN npm run build -- --configuration=production


# Этап 2: развёртывание через Nginx
FROM nginx:1.25-alpine


# Удаляем стандартный конфиг Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем кастомный конфиг (см. ниже)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранное приложение в директорию Nginx
# Предполагаем, что вывод сборки — dist/ (стандарт для Angular)
COPY --from=builder /app/dist/finefolio-fe/browser /usr/share/nginx/html


# Открываем порт 80 (HTTP)
EXPOSE 80


# Запускаем Nginx в режиме «не как демон» (чтобы контейнер не завершался)
CMD ["nginx", "-g", "daemon off;"]
