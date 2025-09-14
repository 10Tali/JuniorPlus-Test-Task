FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM node:20
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY server.cjs .
RUN npm install express http-proxy-middleware
EXPOSE 8080
CMD ["node", "server.cjs"]
