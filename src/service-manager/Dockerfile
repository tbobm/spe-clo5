FROM node:10-alpine

ADD package.json package.json

RUN npm install

ADD . .

CMD ["npm","run", "start"]
