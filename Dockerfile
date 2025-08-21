FROM node:18

WORKDIR /app

# Copy only needed files
COPY package.json package-lock.json ./
RUN npm install express http-proxy-middleware

# Copy React build and server.js
COPY build ./build
COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]

