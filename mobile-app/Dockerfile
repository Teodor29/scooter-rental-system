FROM node:22

WORKDIR /mobile-app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3002

CMD ["npm", "run", "dev"]
