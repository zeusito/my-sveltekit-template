# Stage 1: Build the Application
FROM node:22-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json .
RUN npm install
RUN npm ci

# Copy the source code and build the application
COPY . .
RUN npm run build
RUN npm prune --production

# Stage 2: Run the Application
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the build directory and node_modules from the previous stage
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

# Expose the port and set the environment variable
EXPOSE 3000
ENV NODE_ENV=production

# Run the application
CMD [ "node", "build" ]
