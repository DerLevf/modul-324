FROM node:22.15.0-slim AS builder

WORKDIR /app

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.29-bookworm

LABEL service="speedl"

COPY --from=builder /app/dist/SpeedL/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf