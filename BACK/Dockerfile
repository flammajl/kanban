FROM node:alpine

WORKDIR /app-back

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "server"]