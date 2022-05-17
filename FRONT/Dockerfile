FROM node:14.17.3-slim

RUN npm install -g http-server

ENV VITE_API_URL=http://localhost:5000

WORKDIR /app-front

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]