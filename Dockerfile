# ===========
# 1. Build Stage
# ===========
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the React app
RUN npm run build

# ===========
# 2. Serve Stage
# ===========
FROM node:18-alpine

WORKDIR /app

# Install "serve" globally to serve static files
RUN npm install -g serve

# Copy build output from the previous stage
COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]

