FROM node:16.16.0

WORKDIR /front
COPY package*.json ./
EXPOSE 3000
RUN npm install

COPY . .
CMD ["npm", "run", "start"]