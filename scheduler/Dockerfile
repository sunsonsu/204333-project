#production build
# FROM node:18-alpine AS base

# FROM base AS depens

# WORKDIR /app
# COPY ./package.json ./
# COPY ./prisma ./

# RUN npm install
# RUN npx prisma generate

# FROM base AS builder

# WORKDIR /app
# COPY --from=depens /app/node_modules ./node_modules
# COPY . .

# RUN npm run build

# FROM base AS runner

# WORKDIR /app
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules

# ENV PORT=3001

# CMD [ "node", "dist/index.js" ]

# Use the Node.js Alpine base image

#development build
FROM node:18-alpine AS base

# Install dependencies
FROM base AS depens
WORKDIR /app
COPY package.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate

# Development Layer (skip build, use live code)
FROM base AS dev
WORKDIR /app
COPY --from=depens /app/node_modules ./node_modules
COPY . .  

# Install `nodemon` for development environment
RUN npm install -g nodemon

# Set environment variables (you could also load them via `.env` file at runtime)
ENV NODE_ENV=development
ENV PORT=3001

# Expose the port used by your app
EXPOSE 3001

# Use `npm run dev` or your development script to run the app
CMD ["npm", "run", "dev"]
