FROM node:12
ADD . /app
RUN mkdir /logs && chmod +w /logs
ADD scripts /scripts
WORKDIR /app
CMD ["npm", "start"]
