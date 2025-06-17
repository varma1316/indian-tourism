FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install express mongoose body-parser ejs
COPY . .
EXPOSE 3000
CMD ["node", "backend.js"]
