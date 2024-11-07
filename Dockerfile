# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev) for build stage
RUN npm pkg delete scripts.prepare && \
    npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production dependencies only, skip husky installation
RUN npm pkg delete scripts.prepare && \
    npm ci --omit=dev --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"] 