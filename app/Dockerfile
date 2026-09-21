FROM node:26-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.29-bookworm

LABEL service="speedl"

COPY --from=builder /app/dist/SpeedL/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf