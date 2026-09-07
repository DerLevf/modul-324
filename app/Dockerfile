# Mit AS builder geben wir dem Image eine Namen um darauf zuzugreifen
FROM node:lts-slim AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

# Ab hier beginnt das Produktive Image!
FROM nginx:1.29-bookworm

LABEL service="speedl"

# Hier kopieren wir nur den gebauten Code für den Browser vom builder Image
COPY --from=builder /app/dist/SpeedL/browser /usr/share/nginx/html
# Hier kopieren wir die nginx.conf Konfigurationsdatei (siehe weiter unten)
COPY nginx.conf /etc/nginx/conf.d/default.conf