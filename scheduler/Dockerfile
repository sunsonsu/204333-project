# production build
FROM node:18-alpine AS base

FROM base AS depens

WORKDIR /app
COPY ./package.json ./
COPY ./prisma ./prisma

RUN npm install
RUN npx prisma generate

FROM base AS builder

WORKDIR /app
COPY --from=depens /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY ./prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

ENV PORT=3000

CMD [ "node", "dist/index.js" ]