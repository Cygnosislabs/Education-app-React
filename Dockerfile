FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./
RUN npm install

# Copy all source code (React + server.js)
COPY . .

# Build React
RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]

