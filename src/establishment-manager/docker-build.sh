#! /bin/bash

npm run build
cp Dockerfile build
cp .env build
cp ormconfig.prod.json build/ormconfig.json
cp package.json build
cp -r scripts build
cp -r src/controllers/mock build/controllers
cd build
npm i
docker build -t 172.16.228.42:443/establishment-manager:test-rc .
cd ..
