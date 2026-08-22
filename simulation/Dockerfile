FROM node:22

WORKDIR /simulation

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]
