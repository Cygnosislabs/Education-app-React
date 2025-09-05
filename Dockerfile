# ===========================
# Stage 1: Build React app
# ===========================
FROM node:18 AS builder

WORKDIR /app

# Copy package.json & package-lock.json first (caching)
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Build React app (creates /app/build)
RUN npm run build

# ===========================
# Stage 2: Prepare final Node image
# ===========================
FROM node:18-slim

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy server.js
COPY server.js ./

# Copy React build from builder stage
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]

