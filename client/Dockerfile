#production build
FROM node:18-alpine AS base

FROM base AS depens

WORKDIR /app
COPY ./package.json ./
# COPY ./prisma ./

RUN npm install
# RUN npx prisma generate

FROM base AS builder

WORKDIR /app
COPY --from=depens /app/node_modules ./node_modules

COPY . .

RUN npm install -g npm

RUN npm install -g bun

RUN bun run build

FROM base AS runner

WORKDIR /app

# COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV PORT=3000
EXPOSE 3000

ENV HOSTNAME="0.0.0.0"

CMD [ "node", "server.js" ]