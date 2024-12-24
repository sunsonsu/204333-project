FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy environment and package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application source files into the container
COPY . .

# Expose port 3000 
EXPOSE 3000

# Generate Prisma client

RUN npm run build

CMD [ "npm", "start" ]
