# build environment
FROM node:14-alpine as build

WORKDIR /app

ENV VITE_API_URL=http://localhost:5000

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production environment
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

CMD ["nginx", "-g", "daemon off;"]