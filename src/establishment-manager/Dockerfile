FROM node:12
ADD . /app
WORKDIR /app
ADD scripts /scripts
RUN npm i && npm run build && cp .env build && cp -r src/public build && cp package.json build && cp -r scripts build && cp -r src/controllers/mock build/controllers
WORKDIR /app/build
RUN npm i
CMD ["npm", "start"]
