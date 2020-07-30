FROM node:12
WORKDIR /app
COPY package.json package.json
COPY . .
COPY scripts /scripts
RUN npm install
CMD ["npm","run", "start"]
