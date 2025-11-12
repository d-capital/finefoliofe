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

# Удаляем стандартный конфиг
RUN rm /etc/nginx/conf.d/default.conf

# Копируем кастомный конфиг (должен поддерживать SSL)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранное приложение
COPY --from=builder /app/dist/finefolio-fe/browser /usr/share/nginx/html

# Копируем SSL‑сертификаты (положите их в ту же директорию, что Dockerfile)
COPY ssl/fine-folio.ru.pem /etc/nginx/ssl/fine-folio.ru.pem
COPY ssl/fine-folio.ru.key /etc/nginx/ssl/fine-folio.ru.key

# Открываем порты HTTP и HTTPS
EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]