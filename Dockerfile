# syntax = docker/dockerfile:1

# Base stage: set up the working directory and environment variables
FROM node:18-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Dependencies stage: Install all the required packages
FROM base AS dependencies
# Copy package files first to leverage Docker caching
COPY package.json package-lock.json ./
# Optionally test without cleaning cache:
# RUN npm cache clean --force
RUN npm ci --verbose

# Builder stage: Build the Next.js app
FROM base AS builder
# Copy over the installed node_modules from the dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
# Copy the rest of your application code
COPY . .
# Build the Next.js application
RUN npm run build

# Production stage: Create the final image
FROM node:18-alpine AS runner
WORKDIR /app
# Set the environment to production
ENV NODE_ENV=production
# Copy over built files and static assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
# Copy the node_modules directory from the builder stage
COPY --from=builder /app/node_modules ./node_modules
# Expose the default Next.js port
EXPOSE 3000
# Start the Next.js application with the production command
CMD ["npm", "start"]
