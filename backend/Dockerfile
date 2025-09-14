FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN apt-get update && apt-get install -y netcat-openbsd postgresql-client

RUN npm run build

COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

CMD ["/wait-for-postgres.sh", "db", "sh", "-c", "npm run migrate && npm run start"]