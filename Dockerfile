FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm ci
COPY . .
RUN npm run build

CMD [ "npm", "run", "start" ] 
#CMD [ "sh","-c", "npm run start & npm run start-json-server" ]