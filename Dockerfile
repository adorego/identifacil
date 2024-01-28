FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run start-json-server
RUN npm run build

CMD [ "npm", "run", "start" ]