FROM node:14.17.3-slim

ENV VITE_API_URL=http://localhost:5000

WORKDIR /app-front

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]