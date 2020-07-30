FROM node:12
WORKDIR /app
COPY package.json package.json
COPY scripts /scripts
RUN npm install && chmod +x /scripts/run-test.sh
COPY . .
CMD ["npm","run", "start"]
