FROM node:latest

WORKDIR /1work/backend-end

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g pm2

EXPOSE 8080

CMD ["npm", "start"]


