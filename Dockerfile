FROM node:20

COPY src .

RUN npm install

CMD ["npm", "start"]