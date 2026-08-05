FROM node:20

WORKDIR /app

RUN npm install -g json-server

COPY . .

EXPOSE 4000

CMD ["json-server", "--watch", "db.json", "--port", "4000", "--host", "0.0.0.0"]
