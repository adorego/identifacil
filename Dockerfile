FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# CMD [ "npm", "run", "start" ] 
CMD [ "sh","-c", "npm start & npm start-json-server" ]