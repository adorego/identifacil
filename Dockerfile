FROM node:20.11.1-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

CMD [ "npm", "run", "start" ] 
#CMD [ "sh","-c", "npm run start & npm run start-json-server" ]