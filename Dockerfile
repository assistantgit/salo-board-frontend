# ===== Stage 1: build =====
FROM node:20-alpine AS builder

WORKDIR /app

# копіюємо тільки package.json + lock для кешу
COPY package*.json ./

# встановлюємо залежності
RUN npm ci

# копіюємо весь проєкт
COPY . .

# білд (vite)
RUN npx vite build


# ===== Stage 2: nginx =====
FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 81

CMD ["nginx", "-g", "daemon off;"]