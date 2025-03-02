#production build
FROM node:18-alpine AS base

FROM base AS depens

WORKDIR /app
COPY ./package.json ./

RUN npm install

FROM base AS builder

ENV NEXT_PUBLIC_LOGIN_BASE_URL=/api/login
ENV NEXT_PUBLIC_COIN_BASE_URL=/api/coin
ENV NEXT_PUBLIC_CHAT_BASE_URL=/api/chat

WORKDIR /app
COPY --from=depens /app/node_modules ./node_modules

COPY . .

RUN npm install -g npm

RUN npm run build

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

CMD [ "node", "server.js" ]